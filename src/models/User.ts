export interface User {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  profilePicture?: string;
  dateJoined: string;
  lastLogin?: string;
}
