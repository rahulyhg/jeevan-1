class ProfilesController < ApplicationController
  before_filter :is_this_user_profile, only: [:edit]
  before_filter :count_sparks, only: [:index, :incomings, :outgoings, :visitors, :shortlists,:accepted, :waiting,:search]
  before_filter :get_current_user, only: [:edit]
  before_filter :not_same_sex, :get_showing_user, only: [:show]

  # GET /profiles/1
  def show
    touch_visitor
    similar_profiles
  end
  def edit
  end

  #-====================================
  #            Edit Profile Page       =
  #=====================================
  # After the save on edit is pressed
  def modify_image
    upload_limit = 20
    if current_user.images.count > upload_limit
      response =  { :error => "Sorry, Limit is #{upload_limit} images", :status => 422 }
    else
      response = {:status => 200}
      current_user.images.create(image_params)
      current_user.update(:images_count => current_user.images.count)
    end
    render json: response
  end
  def modify_avatar
    current_user.update(avatar_params)
    render json: { :status => 200 }
  end
  def remove_image
    logger.info("Debug #{remove_image_params}")
    current_user.images.destroy(remove_image_params['imageid'])
    render json: { :status => 200 }
  end
  def modify_profile
    logger.info("Debug #{profile_params}")
    current_user.profile.update(profile_params)
    render json: { :status => 200 }
  end
  def modify_contact
    current_user.contact.update(contact_params)
    render json: { :status => 200 }
  end
  def modify_religion
    current_user.religion.update(religion_params)
    render json: { :status => 200 }
  end
  def modify_kundali
    current_user.kundali.update(kundali_params)
    render json: { :status => 200 }
  end
  def modify_about
    logger.info("Debug #{about_params}")
    text = about_params[:me].split()
    text.each do |word| 
      if word.length > 50
        # Donot save
        render json: { :status => 200 }
      end
    end
    current_user.about.update(about_params)
    render json: { :status => 200 }
  end
  def modify_hobby
    current_user.hobby.update(hobby_params)
    render json: { :status => 200 }
  end
  def modify_family
    current_user.family.update(family_params)
    render json: { :status => 200 }
  end
  def modify_education
    current_user.education.update(education_params)
    render json: { :status => 200 }
  end
  def modify_occupation
    current_user.occupation.update(occupation_params)
    render json: { :status => 200 }
  end
  def modify_lifestyle
    current_user.lifestyle.update(lifestyle_params)
    render json: { :status => 200 }
  end
  def modify_desire
    current_user.desire.update(desire_params)
    render json: { :status => 200 }
  end

  /#=================================================
  #            # Express Interest Button            =
  #=================================================*/

  def interest
    if current_user.id != params[:to_user_id].to_i
      find_first = current_user.interests.where(to_user_id: params[:to_user_id]).first
      logger.info("Debug Params inspect #{params.inspect}")
      if !find_first
        current_user.interests.create(to_user_id: params[:to_user_id])
        notify_growl(:interest, params[:to_user_id], "Expressed Interest in You")
      else
        find_first.touch
      end
    end
    render json: { :status => 200 }
    # redirect_to(explore_index_path)
  end


  /#=================================================
  #            Accept Reject Button is Pressed      =
  #=================================================*/

  def interest_response
    commit = params[:commit]
    interest = Interest.where(:to_user_id => current_user.id, :user_id => params[:to_user_id]).first
    if commit == "Accept"
      interest.update(:response => 1)
      notify_growl(:accepted, params[:to_user_id], "Accepted Interest")
    elsif commit == "Reject"
      interest.update(:response => 0)
      notify_growl(:rejected, params[:to_user_id], "Rejected Interest")
    end

    render json: { :status => 200 }
  end

  def shortlist
    if current_user.id != params[:to_user_id].to_i
      find_first = current_user.shortlists.where(to_user_id: params[:to_user_id]).first
      logger.info("Debug Params inspect #{params.inspect}")
      if !find_first
        current_user.shortlists.create(to_user_id: params[:to_user_id])
      end
    end
    render json: { :status => 200 }
  end

  #==================================
  #            Ajax Calls
  #==================================


  def get_selectize
    selectize_yml_path = "#{Rails.root}/app/assets/yaml/selectize/profile/edit/items.yml"
    select_profile_edit_items = YAML.load_file(selectize_yml_path)
    render json: { :data => select_profile_edit_items }
  end
  #-----  End of Ajax Calls  ------#

  /#=============================
  #            Pages            =
  #==============================#/
  def index
    already_visited    = [current_user.id]
    # already_visited   += Visitor.where(user_id: current_user.id).pluck(:viewed_id)
    # already_visited   += Interest.where("user_id = ?", current_user.id).pluck(:to_user_id)
    # already_visited   += Shortlist.where("user_id = ?", current_user.id).pluck(:to_user_id)
    @matching = User.where("sex <> ? AND devotion = ? AND id NOT IN (?)", current_user.sex, current_user.devotion, already_visited).order('images_count DESC, avatar_updated_at DESC, avatar_updated_at DESC').paginate(:page => params[:page], :per_page => 10)
  end
  def incomings
    incomings = Interest.where(to_user_id: current_user.id).pluck(:user_id)
    @incomings = User.find(incomings).paginate(:page => params[:page], :per_page => 10)
    badge_reset(current_user, "interest")
  end
  def accepted
    accepted = Interest.where("user_id = ? AND response = ?", current_user.id, 1).pluck(:user_id)
    @accepted = User.find(accepted).paginate(:page => params[:page], :per_page => 10)
    badge_reset(current_user, "accepted")
  end
  def outgoings
    rejected = Interest.where("user_id = ? AND response = ?", current_user.id, 3).pluck(:to_user_id)
    @rejected = User.find(rejected).paginate(:page => params[:page], :per_page => 10)
    badge_reset(current_user, "rejected")
  end
  def visitors
    visitors = Visitor.where(viewed_id: current_user.id).pluck(:user_id)
    @visitors = User.find(visitors).paginate(:page => params[:page], :per_page => 10)
    badge_reset(current_user, "visitor")
  end
  def waiting
    waiting = Interest.where("user_id = ? AND response IS NULL", current_user.id).pluck(:to_user_id)
    @waiting = User.find(waiting).paginate(:page => params[:page], :per_page => 10)
  end
  def shortlists
    shortlists = Shortlist.where(user_id: current_user.id).pluck(:to_user_id)
    @shortlists = User.find(shortlists).paginate(:page => params[:page], :per_page => 10)
  end

  def search
    query_string = params[:query]
    @solr = User.search do
      fulltext query_string
      without(:sex).equal_to(current_user.sex)
      order_by(:images_count, :desc)
      paginate :page => params[:page], :per_page => 12
    end
    @search = @solr.results
  end

  def similar_profiles
    visiting_user = User.find(Profile.find(params[:id]).user_id)
    @similar_profiles_paginate = User.where("id <> ? AND devotion = ? AND sex = ?", visiting_user.id, visiting_user.devotion, visiting_user.sex).order('updated_at DESC, avatar_updated_at DESC').take(20).paginate(:page => params[:page], :per_page => 6) # 6 is a good number
  end

  #-----  End of Pages  -----#
  def count_sparks
    @sparks = Hash.new {|h, k| h[k] = [] }
    @sparks[:visitors]  = number_with_delimiter(Visitor.where(viewed_id: current_user.id).count)
    @sparks[:incoming]  = number_with_delimiter(Interest.where(to_user_id: current_user.id).count)
    @sparks[:rejected]  = number_with_delimiter(Interest.where("user_id = ? AND response = ?", current_user.id, 3).count)
    @sparks[:waiting]   = number_with_delimiter(Interest.where("user_id = ? AND response IS NULL", current_user.id).count)
    @sparks[:shortlist] = number_with_delimiter(Shortlist.where(user_id: current_user.id).count)
    @sparks[:accepted]  = number_with_delimiter(Interest.where("user_id = ? AND response = ?", current_user.id, 1).count)
  end

  protected

  # for editing profile
  def is_this_user_profile
    if (current_user.profile.id != params[:id].to_i)
      redirect_to(explore_index_path)
    end
  end
  def get_current_user
    @user = make_user(current_user)
  end
  def get_showing_user
    @user = make_user(User.find(Profile.find(params[:id]).user_id))
  end
  def not_same_sex
    user = User.find(Profile.find(params[:id]).user_id)
    if user.id != current_user.id && current_user.sex == user.sex
      redirect_to explore_index_path
    end
  end

  private
  def image_params
    params.permit("avatar")
  end
  def avatar_params
    params.permit(:avatar)
  end
  def remove_image_params
    params.permit("imageid")
  end
  def profile_params
    params.permit(Profile.columns.map {|c| c.name })
  end
  def contact_params
    params.permit(Contact.columns.map {|c| c.name })
  end
  def religion_params
    params.permit(Religion.columns.map {|c| c.name })
  end
  def kundali_params
    params.permit(Kundali.columns.map {|c| c.name })
  end
  def about_params
    params.permit(About.columns.map {|c| c.name })
  end
  def hobby_params
    params.permit(Hobby.columns.map {|c| c.name })
  end
  def family_params
    params.permit(Family.columns.map {|c| c.name })
  end
  def education_params
    params.permit(Education.columns.map {|c| c.name })
  end
  def occupation_params
    params.permit(Occupation.columns.map {|c| c.name })
  end
  def lifestyle_params
    params.permit(Lifestyle.columns.map {|c| c.name })
  end
  def desire_params
    params.permit(Desire.columns.map {|c| c.name })
  end

  #===============================================*
  #            This Class's Helpers
  #===============================================*
  def touch_visitor
    visiting_user_id = Profile.find(params[:id]).user_id
    if current_user.id != visiting_user_id
      if Visitor.where(user_id: current_user.id, viewed_id: visiting_user_id).count == 0
        Visitor.find_or_create_by(user_id: current_user.id, viewed_id: visiting_user_id)
        notify_growl(:visitor, visiting_user_id, "Profile Viewed")
      end
    end
  end
  def notify_growl(event, visiting_user_id, title)
    channel_name = "socket_user_#{visiting_user_id}"
    visited_user = User.find(visiting_user_id)
    data = {}
    data[:img]   = visited_user.avatar
    data[:title] = title
    data[:profile_id] = current_user.profile.id
    WebsocketRails[channel_name].trigger(event, data)
    badge_increment(visited_user, event.to_s)
  end
  def badge_increment(user, event)
    if event == "interest"
      user.badge.update(interest: user.badge.interest + 1)
    elsif event == "visitor"
      user.badge.update(visitor: user.badge.visitor + 1)
    elsif event == "accepted"
      user.badge.update(accepted: user.badge.accepted + 1)
    elsif event == "rejected"
      user.badge.update(rejected: user.badge.rejected + 1)
    end
  end
  def badge_reset(user, event)
    if event == "interest"
      user.badge.update(interest: 0)
    elsif event == "visitor"
      user.badge.update(visitor: 0)
    elsif event == "accepted"
      user.badge.update(accepted: 0)
    elsif event == "rejected"
      user.badge.update(rejected: 0)
    end
  end
end