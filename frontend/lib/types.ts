export type Article = {
  id: number;
  title: string;
  slug: string;
  content: string;
};

export type City = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type TravelRoute = {
  id: number;
  title: string;
  slug: string;
  description: string;
};

export type Comment = {
  id: number;
  user: number;
  user_details?: {
    username: string;
    avatar: string | null;
  };
  body: string;
  created_at: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type PublicUserProfile = {
  id: number;
  username: string;
  display_name: string;
  bio: string;
  avatar: string | null;
  full_name: string | null;
  email: string | null;
  phone_number: string | null;
  birth_date: string | null;
  age: number | null;
  gender: string | null;
  current_location: string | null;
  birth_place: string | null;
  religion: string | null;
  education_level: string | null;
  occupation: string | null;
  job_title: string | null;
  membership_date: string | null;
  followers_count: number;
  following_count: number;
};

export type UserProfile = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  display_name: string;
  bio: string;
  avatar: string | null;
  role: string;
  birth_date: string | null;
  gender: string;
  current_location: string;
  birth_place: string;
  religion: string;
  education_level: string;
  occupation: string;
  job_title: string;
  phone_number: string;
  membership_date: string;
  followers_count: number;
  following_count: number;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
