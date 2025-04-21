const getUserDataWithoutOnline = async (objectId:number) => {
        try {
          let response = await vkApi.api("users.get", {
            user_ids: objectId,
            fields:
              "quotes, games, movies, music, photo_400_orig, universities, activities, about, books, bdate, can_see_audio, can_write_private_message, career, city, connections, contacts, counters, country, crop_photo, education, has_photo, home_town, interests, military, nickname, occupation, online, personal, quotes, relatives, relation, schools, sex, site, tv, id,first_name,first_name_gen,first_name_acc,last_name,last_name_gen,last_name_acc,sex,has_photo,photo_id,photo_50,photo_100,photo_200,contact_name,occupation,bdate,city,screen_name,online_info,verified,blacklisted,blacklisted_by_me,can_call,can_write_private_message,can_send_friend_request,can_invite_to_chats,friend_status,followers_count,profile_type,contacts,employee_mark,employee_working_state,is_service_account,image_status,name,type,members_count,member_status,is_closed,can_message,deactivated,activity,ban_info,is_messages_blocked,can_post_donut,site,reposts_disabled,description,action_button,menu,role,first_name_nom,first_name_gen,first_name_dat,first_name_acc,first_name_ins,last_name_gen,last_name_dat,last_name_acc,last_name_ins,nickname,maiden_name,screen_name,first_name,last_name",
          });
          return response[0];
        } catch (error) {
          console.error(error);
          return [];
        }
}
      
export default getUserDataWithoutOnline;