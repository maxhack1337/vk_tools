      const formatRelationName = (relation: any, sex: number, user: { first_name_ins: any; last_name_ins: any; first_name_dat: any; last_name_dat: any; first_name_acc: any; last_name_acc: any; }) => {
        switch (relation) {
          case 2:
          case 3:
          case 5:
          case 8: {
            return `${user.first_name_ins} ${user.last_name_ins}`;
          }
          case 4: {
            return sex === 2
              ? `${user.first_name_dat} ${user.last_name_dat}`
              : `${user.first_name_ins} ${user.last_name_ins}`;
          }
          case 7: {
            return `${user.first_name_acc} ${user.last_name_acc}`;
          }
        }
}
      
export default formatRelationName;