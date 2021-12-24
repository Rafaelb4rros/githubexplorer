type responseData = {
  status: number;
  id: number;
  isExpanded: boolean;
  data: {
    avatar_url: string;
    id: number;
    type: string | null;
    bio: string;
    name: string;
    url: string;
    repos_url: string;
    html_url: string;
    followers: number;
    following: number;
    following_url: string;
    created_at: string;
    public_repos: string;
    full_name: string;
    description: string;
    forks: number;
    owner: {
      login: string;
      avatar_url: string;
    };
  };
};

export { responseData };
