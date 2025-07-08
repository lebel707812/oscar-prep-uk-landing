import { supabase } from './client';

// Types for Forum entities
export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  slug: string;
  content: string;
  author_id: string;
  category_id?: string;
  is_pinned: boolean;
  is_locked: boolean;
  is_solved: boolean;
  view_count: number;
  reply_count: number;
  last_reply_at?: string;
  last_reply_by?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  // Joined data
  author?: UserForumProfile;
  category?: ForumCategory;
  last_reply_author?: UserForumProfile;
}

export interface ForumPost {
  id: string;
  topic_id: string;
  author_id: string;
  content: string;
  parent_post_id?: string;
  is_solution: boolean;
  like_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  author?: UserForumProfile;
  replies?: ForumPost[];
}

export interface UserForumProfile {
  user_id: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  location?: string;
  website?: string;
  specialization?: string;
  experience_level?: string;
  post_count: number;
  reputation_score: number;
  last_seen_at: string;
  is_moderator: boolean;
  is_banned: boolean;
  created_at: string;
  updated_at: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  creator_id: string;
  max_members: number;
  current_members: number;
  is_private: boolean;
  meeting_schedule?: string;
  study_focus?: string;
  exam_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Joined data
  creator?: UserForumProfile;
  members?: StudyGroupMember[];
}

export interface StudyGroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'member';
  joined_at: string;
  // Joined data
  user?: UserForumProfile;
}

export interface PrivateMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject?: string;
  content: string;
  is_read: boolean;
  created_at: string;
  // Joined data
  sender?: UserForumProfile;
  recipient?: UserForumProfile;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message?: string;
  related_id?: string;
  related_type?: string;
  is_read: boolean;
  created_at: string;
}

// Forum Categories Functions
export const fetchForumCategories = async (): Promise<ForumCategory[]> => {
  const { data, error } = await supabase
    .from('forum_categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data || [];
};

export const fetchForumCategory = async (slug: string): Promise<ForumCategory | null> => {
  const { data, error } = await supabase
    .from('forum_categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data;
};

// Forum Topics Functions
export const fetchForumTopics = async (
  categoryId?: string,
  limit: number = 20,
  offset: number = 0
): Promise<ForumTopic[]> => {
  let query = supabase
    .from('forum_topics')
    .select(`
      *,
      author:user_forum_profiles!forum_topics_author_id_fkey(*),
      category:forum_categories(*),
      last_reply_author:user_forum_profiles!forum_topics_last_reply_by_fkey(*)
    `)
    .order('is_pinned', { ascending: false })
    .order('last_reply_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
};

export const fetchForumTopic = async (slug: string): Promise<ForumTopic | null> => {
  const { data, error } = await supabase
    .from('forum_topics')
    .select(`
      *,
      author:user_forum_profiles!forum_topics_author_id_fkey(*),
      category:forum_categories(*)
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
};

export const createForumTopic = async (topicData: {
  title: string;
  slug: string;
  content: string;
  category_id?: string;
  tags?: string[];
}): Promise<ForumTopic> => {
  const { data, error } = await supabase
    .from('forum_topics')
    .insert([{
      ...topicData,
      author_id: (await supabase.auth.getUser()).data.user?.id
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateForumTopic = async (
  id: string,
  updates: Partial<ForumTopic>
): Promise<ForumTopic> => {
  const { data, error } = await supabase
    .from('forum_topics')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteForumTopic = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('forum_topics')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const incrementTopicViews = async (topicId: string): Promise<void> => {
  const { error } = await supabase.rpc('increment_topic_views', {
    topic_id: topicId
  });

  if (error) throw error;
};

// Forum Posts Functions
export const fetchForumPosts = async (
  topicId: string,
  limit: number = 20,
  offset: number = 0
): Promise<ForumPost[]> => {
  const { data, error } = await supabase
    .from('forum_posts')
    .select(`
      *,
      author:user_forum_profiles!forum_posts_author_id_fkey(*)
    `)
    .eq('topic_id', topicId)
    .is('parent_post_id', null) // Only top-level posts
    .order('created_at', { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data || [];
};

export const fetchPostReplies = async (parentPostId: string): Promise<ForumPost[]> => {
  const { data, error } = await supabase
    .from('forum_posts')
    .select(`
      *,
      author:user_forum_profiles!forum_posts_author_id_fkey(*)
    `)
    .eq('parent_post_id', parentPostId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const createForumPost = async (postData: {
  topic_id: string;
  content: string;
  parent_post_id?: string;
}): Promise<ForumPost> => {
  const { data, error } = await supabase
    .from('forum_posts')
    .insert([{
      ...postData,
      author_id: (await supabase.auth.getUser()).data.user?.id
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateForumPost = async (
  id: string,
  updates: Partial<ForumPost>
): Promise<ForumPost> => {
  const { data, error } = await supabase
    .from('forum_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteForumPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('forum_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const markPostAsSolution = async (postId: string): Promise<void> => {
  const { error } = await supabase
    .from('forum_posts')
    .update({ is_solution: true })
    .eq('id', postId);

  if (error) throw error;
};

// Post Likes Functions
export const likePost = async (postId: string): Promise<void> => {
  const { error } = await supabase
    .from('post_likes')
    .insert([{
      post_id: postId,
      user_id: (await supabase.auth.getUser()).data.user?.id
    }]);

  if (error) throw error;
};

export const unlikePost = async (postId: string): Promise<void> => {
  const { error } = await supabase
    .from('post_likes')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

  if (error) throw error;
};

export const checkPostLiked = async (postId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
};

// User Forum Profile Functions
export const fetchUserForumProfile = async (userId: string): Promise<UserForumProfile | null> => {
  const { data, error } = await supabase
    .from('user_forum_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const createOrUpdateUserForumProfile = async (
  profileData: Partial<UserForumProfile>
): Promise<UserForumProfile> => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  
  const { data, error } = await supabase
    .from('user_forum_profiles')
    .upsert([{
      user_id: userId,
      ...profileData
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Study Groups Functions
export const fetchStudyGroups = async (
  limit: number = 20,
  offset: number = 0
): Promise<StudyGroup[]> => {
  const { data, error } = await supabase
    .from('study_groups')
    .select(`
      *,
      creator:user_forum_profiles!study_groups_creator_id_fkey(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data || [];
};

export const fetchStudyGroup = async (id: string): Promise<StudyGroup | null> => {
  const { data, error } = await supabase
    .from('study_groups')
    .select(`
      *,
      creator:user_forum_profiles!study_groups_creator_id_fkey(*),
      members:study_group_members(
        *,
        user:user_forum_profiles(*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const createStudyGroup = async (groupData: {
  name: string;
  description?: string;
  max_members?: number;
  is_private?: boolean;
  meeting_schedule?: string;
  study_focus?: string;
  exam_date?: string;
}): Promise<StudyGroup> => {
  const { data, error } = await supabase
    .from('study_groups')
    .insert([{
      ...groupData,
      creator_id: (await supabase.auth.getUser()).data.user?.id
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const joinStudyGroup = async (groupId: string): Promise<void> => {
  const { error } = await supabase
    .from('study_group_members')
    .insert([{
      group_id: groupId,
      user_id: (await supabase.auth.getUser()).data.user?.id
    }]);

  if (error) throw error;
};

export const leaveStudyGroup = async (groupId: string): Promise<void> => {
  const { error } = await supabase
    .from('study_group_members')
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

  if (error) throw error;
};

// Search Functions
export const searchForumContent = async (
  query: string,
  type: 'topics' | 'posts' | 'both' = 'both'
): Promise<{ topics: ForumTopic[]; posts: ForumPost[] }> => {
  const results = { topics: [] as ForumTopic[], posts: [] as ForumPost[] };

  if (type === 'topics' || type === 'both') {
    const { data: topicsData, error: topicsError } = await supabase
      .from('forum_topics')
      .select(`
        *,
        author:user_forum_profiles!forum_topics_author_id_fkey(*),
        category:forum_categories(*)
      `)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(10);

    if (topicsError) throw topicsError;
    results.topics = topicsData || [];
  }

  if (type === 'posts' || type === 'both') {
    const { data: postsData, error: postsError } = await supabase
      .from('forum_posts')
      .select(`
        *,
        author:user_forum_profiles!forum_posts_author_id_fkey(*)
      `)
      .ilike('content', `%${query}%`)
      .order('created_at', { ascending: false })
      .limit(10);

    if (postsError) throw postsError;
    results.posts = postsData || [];
  }

  return results;
};

// Notifications Functions
export const fetchUserNotifications = async (
  limit: number = 20,
  offset: number = 0
): Promise<Notification[]> => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data || [];
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) throw error;
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
    .eq('is_read', false);

  if (error) throw error;
};

