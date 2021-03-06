# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140621052720) do

  create_table "abouts", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "me"
  end

  create_table "badges", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "visitor",    default: 0
    t.integer  "interest",   default: 0
    t.integer  "accepted",   default: 0
    t.integer  "rejected",   default: 0
    t.integer  "message",    default: 0
  end

  add_index "badges", ["user_id"], name: "user_id", using: :btree

  create_table "blogs", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contacts", force: true do |t|
    t.integer  "user_id"
    t.text     "address"
    t.string   "mother_no",  limit: 32, default: ""
    t.string   "father_no",  limit: 32
    t.string   "self_no",    limit: 32
    t.string   "g_id"
    t.string   "s_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "ln_link"
    t.string   "w_id"
    t.text     "fb_link"
  end

  create_table "desires", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "desired_about"
    t.string   "desired_height",                     default: "medium - tall"
    t.string   "desired_age",                        default: "23 - 29 Yrs"
    t.string   "desired_marital_status",             default: "Single"
    t.string   "desired_country",                    default: "India"
    t.string   "desired_city"
    t.string   "desired_religion"
    t.string   "desired_caste"
    t.string   "desired_mother_tongue",              default: "Hindi"
    t.string   "desired_manglik",        limit: 64,  default: "No"
    t.string   "desired_diet"
    t.string   "desired_smoke",          limit: 32,  default: "No"
    t.string   "desired_drink",          limit: 32,  default: "No"
    t.string   "desired_complexion",     limit: 64,  default: "Fair"
    t.string   "desired_challenged",     limit: 4,   default: "No"
    t.string   "desired_education",      limit: 128
    t.string   "desired_occupation",     limit: 128
    t.string   "desired_income"
    t.text     "desired_notes"
  end

  add_index "desires", ["user_id"], name: "user_id", using: :btree

  create_table "educations", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "school"
    t.text     "grad_college"
    t.text     "post_grad"
    t.text     "post_grad_college"
    t.text     "highest_degree"
    t.text     "graduation"
  end

  add_index "educations", ["user_id"], name: "user_id", using: :btree

  create_table "families", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "values",                     default: "Liberal"
    t.string   "size"
    t.string   "status"
    t.string   "family_income",              default: "10 - 15 Lac"
    t.text     "father"
    t.text     "mother"
    t.text     "brother"
    t.text     "sister"
    t.string   "profile_handler", limit: 64, default: ""
  end

  add_index "families", ["user_id"], name: "user_id", using: :btree

  create_table "hobbies", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "hobby"
    t.text     "interest"
    t.text     "music"
    t.text     "read"
    t.text     "dress"
    t.text     "tv"
    t.text     "movie"
    t.text     "sport"
    t.text     "cuisine"
    t.text     "vacation"
  end

  add_index "hobbies", ["user_id"], name: "user_id", using: :btree

  create_table "images", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "images", ["created_at"], name: "created_at", using: :btree

  create_table "interests", force: true do |t|
    t.integer  "user_id"
    t.integer  "to_user_id"
    t.integer  "response"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "interests", ["to_user_id"], name: "to_user_id", using: :btree
  add_index "interests", ["user_id"], name: "user_id", using: :btree

  create_table "kundalis", force: true do |t|
    t.integer  "user_id"
    t.datetime "updated_at"
    t.datetime "created_at"
    t.string   "birth_country", default: "India"
    t.text     "birth_city"
    t.text     "tob"
    t.string   "manglik",       default: "No"
    t.string   "sun_sign",      default: ""
    t.string   "moon_sign",     default: ""
    t.string   "nakshatra",     default: ""
  end

  add_index "kundalis", ["user_id"], name: "user_id", using: :btree

  create_table "lifestyles", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "diet"
    t.string   "smoke",                 default: "No"
    t.string   "drink",                 default: "No"
    t.string   "complexion"
    t.string   "blood",      limit: 4
    t.string   "weight",     limit: 4
    t.string   "own_house",  limit: 64
    t.string   "own_car",    limit: 64, default: "Yes"
    t.string   "pet",        limit: 64, default: "No"
    t.string   "hiv",        limit: 4,  default: "No"
    t.string   "height",     limit: 4
  end

  add_index "lifestyles", ["user_id"], name: "user_id", using: :btree

  create_table "messages", force: true do |t|
    t.datetime "created_at"
    t.integer  "user_id"
    t.integer  "to_user_id"
    t.text     "message"
  end

  add_index "messages", ["to_user_id"], name: "to_user_id", using: :btree
  add_index "messages", ["user_id"], name: "user_id", using: :btree

  create_table "occupations", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "work_status",     default: "Employed"
    t.string   "occupation",      default: ""
    t.string   "company",         default: ""
    t.string   "annual_income",   default: ""
    t.string   "settling_abroad", default: "No"
  end

  add_index "occupations", ["user_id"], name: "user_id", using: :btree

  create_table "profiles", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "posted_by",      limit: 64, default: "Self"
    t.string   "marital_status", limit: 64, default: "Single"
    t.string   "home"
  end

  add_index "profiles", ["user_id"], name: "user_id", using: :btree

  create_table "religions", force: true do |t|
    t.integer  "user_id"
    t.string   "mother_tongue", default: "Hindi"
    t.string   "caste",         default: ""
    t.string   "sub_caste",     default: ""
    t.string   "native_place",  default: ""
    t.datetime "updated_at"
    t.datetime "created_at"
  end

  add_index "religions", ["user_id"], name: "user_id", using: :btree

  create_table "shortlists", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",    limit: 8
    t.integer  "to_user_id", limit: 8
  end

  add_index "shortlists", ["to_user_id"], name: "to_user_id", using: :btree
  add_index "shortlists", ["user_id"], name: "user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                             default: "", null: false
    t.string   "encrypted_password",                default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                     default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "sex",                    limit: 8
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "name",                   limit: 64
    t.string   "dob",                    limit: 64
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "devotion"
    t.integer  "images_count",           limit: 1
    t.string   "username"
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "username", unique: true, using: :btree

  create_table "visitors", force: true do |t|
    t.integer  "user_id"
    t.integer  "viewed_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "visitors", ["user_id"], name: "user_id", using: :btree
  add_index "visitors", ["viewed_id"], name: "viewed_id", using: :btree

end
