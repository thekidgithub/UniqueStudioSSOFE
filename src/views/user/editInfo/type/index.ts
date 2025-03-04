export const enum Gender {
  male = 1,
  female = 2,
  other = 3,
}

export interface EditFormInfo {
  name: string;
  gender: Gender | null;
  password: string;
  email: string;
}

export interface UserInfo {
  name: string;
  gender: Gender | null;
  phoneNumber: string;
  email: string;
}

export interface PermissionFormInfo {
  phone: string;
  joinTime: string;
  group: string;
  role: string;  
}

export interface EditStore {
  editFormInfo: EditFormInfo;
  userInfo: UserInfo;
  permissionFormInfo: PermissionFormInfo
}
