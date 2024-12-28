interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  passwordHash?: string;
  phone?: string;
  isAdmin?: boolean;
  street?: string;
  apartment?: string;
  zip?: string;
  city?: string;
  country?: string;
}

export { User };
