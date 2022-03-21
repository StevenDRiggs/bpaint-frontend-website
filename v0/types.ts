export interface AnalogColor {
  id: number;
  creator_id: number;
  body: string;
  brandname: string;
  glossiness: number;
  image_url: string;
  lightfastness: number;
  medium: string;
  name: string;
  opaqueness: number;
  series: string;
  thickness: number;
  tinting: number;
  created_at: Date;
  updated_at: Date;
}

export interface LoginParams {
  usernameOrEmail: string;
  password: string;
}

export interface PackageInterface {
  errors?: string[];
  id?: number;
  creator_id?: number;
  created_at?: Date;
  updated_at?: Date;
  name?: string;
  slug?: string;
  analog_recipes?: Recipe[];
}

export interface Recipe {
  id: number;
  creator_id: number;
  created_at: Date;
  updated_at: Date;
  display: string;
}

export interface SignupParams {
  username: string;
  email: string;
  password: string;
}

export interface UserState {
  id: number|null;
  username: string|null;
  email: string|null;
  preferences: {
    [index: string]: any;
  };
  flags: {
    [index: string]: any;
  };
  createdAt: Date|null;
  updatedAt: Date|null;
  isAdmin: boolean;
  image_url: string;
  creations: {
    packages: PackageInterface[];
    recipes: Recipe[];
    analog_colors: AnalogColor[];
  };
  favorites: {
    packages: PackageInterface[];
    recipes: Recipe[];
    analog_colors: AnalogColor[];
  };
}

