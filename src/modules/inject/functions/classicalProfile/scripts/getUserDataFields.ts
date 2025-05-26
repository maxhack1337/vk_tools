const getUserDataFields = async (objectId: number) => {
  try {
    let response = await vkApi.api("users.get", {
      user_ids: objectId,
      fields: "can_access_closed,is_closed,first_name_dat,first_name_acc,first_name_ins,last_name_dat,last_name_acc,last_name_ins",
    });
    return response[0];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUserDataFields;
