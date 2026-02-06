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
