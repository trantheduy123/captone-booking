export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },

      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
        /* subMenus: [
          {
            name: "menu.system.system-administrator.user-manage",
            link: "/system/user-manage",
          },
          {
            name: "menu.system.system-administrator.user-redux",
            link: "/system/user-redux",
          },
        ], */
      },
      /* {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      }, */

      {
        //quan li ke hach bac si
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //quản lý chuyên khoa
    name: "menu.admin.specialist",
    menus: [
      {
        name: "menu.admin.manage-specialist",
        link: "/system/manage-specialist",
      },
    ],
  },
  {
    //quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      //Quản lí kế hoạch bác sĩ

      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      //Quản lí benh nhan
      {
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
