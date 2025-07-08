-- Forum Schema for OSCE Prep UK Community
-- This schema creates tables for a comprehensive forum system

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Forum Categories Table
CREATE TABLE forum_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#3B82F6',
    icon TEXT, -- Icon name for UI display
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum Topics Table
CREATE TABLE forum_topics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES forum_categories(id) ON DELETE SET NULL,
    is_pinned BOOLEAN DEFAULT false,
    is_locked BOOLEAN DEFAULT false,
    is_solved BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    last_reply_at TIMESTAMP WITH TIME ZONE,
    last_reply_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    tags TEXT[], -- Array of tags
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum Posts (Replies) Table
CREATE TABLE forum_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    topic_id UUID REFERENCES forum_topics(id) ON DELETE CASCADE,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_post_id UUID REFERENCES forum_posts(id) ON DELETE SET NULL, -- For nested replies
    is_solution BOOLEAN DEFAULT false, -- Mark as solution to the topic
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles Extended (for forum-specific data)
CREATE TABLE user_forum_profiles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    display_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    location TEXT,
    website TEXT,
    specialization TEXT, -- e.g., "Adult Nursing", "Mental Health", etc.
    experience_level TEXT, -- e.g., "Student", "Newly Qualified", "Experienced"
    post_count INTEGER DEFAULT 0,
    reputation_score INTEGER DEFAULT 0,
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_moderator BOOLEAN DEFAULT false,
    is_banned BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Study Groups Table
CREATE TABLE study_groups (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    max_members INTEGER DEFAULT 10,
    current_members INTEGER DEFAULT 1,
    is_private BOOLEAN DEFAULT false,
    meeting_schedule TEXT, -- e.g., "Weekly on Sundays at 7 PM GMT"
    study_focus TEXT, -- e.g., "OSCE Preparation", "Communication Skills"
    exam_date DATE, -- Target exam date for the group
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Study Group Members Table
CREATE TABLE study_group_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member', -- 'admin', 'moderator', 'member'
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(group_id, user_id)
);

-- Private Messages Table
CREATE TABLE private_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject TEXT,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'reply', 'mention', 'like', 'group_invite', etc.
    title TEXT NOT NULL,
    message TEXT,
    related_id UUID, -- ID of related topic, post, group, etc.
    related_type TEXT, -- 'topic', 'post', 'group', etc.
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post Likes Table
CREATE TABLE post_likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- Topic Bookmarks Table
CREATE TABLE topic_bookmarks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    topic_id UUID REFERENCES forum_topics(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(topic_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_forum_topics_category_id ON forum_topics(category_id);
CREATE INDEX idx_forum_topics_author_id ON forum_topics(author_id);
CREATE INDEX idx_forum_topics_created_at ON forum_topics(created_at DESC);
CREATE INDEX idx_forum_topics_last_reply_at ON forum_topics(last_reply_at DESC);
CREATE INDEX idx_forum_posts_topic_id ON forum_posts(topic_id);
CREATE INDEX idx_forum_posts_author_id ON forum_posts(author_id);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_study_group_members_group_id ON study_group_members(group_id);
CREATE INDEX idx_study_group_members_user_id ON study_group_members(user_id);

-- Create functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_forum_categories_updated_at BEFORE UPDATE ON forum_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_topics_updated_at BEFORE UPDATE ON forum_topics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_forum_profiles_updated_at BEFORE UPDATE ON user_forum_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_study_groups_updated_at BEFORE UPDATE ON study_groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment topic view count
CREATE OR REPLACE FUNCTION increment_topic_views(topic_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE forum_topics 
    SET view_count = view_count + 1 
    WHERE id = topic_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update topic reply count and last reply info
CREATE OR REPLACE FUNCTION update_topic_reply_info()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE forum_topics 
        SET 
            reply_count = reply_count + 1,
            last_reply_at = NEW.created_at,
            last_reply_by = NEW.author_id
        WHERE id = NEW.topic_id;
        
        -- Update user post count
        UPDATE user_forum_profiles 
        SET post_count = post_count + 1 
        WHERE user_id = NEW.author_id;
        
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE forum_topics 
        SET reply_count = reply_count - 1
        WHERE id = OLD.topic_id;
        
        -- Update user post count
        UPDATE user_forum_profiles 
        SET post_count = post_count - 1 
        WHERE user_id = OLD.author_id;
        
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for reply count updates
CREATE TRIGGER update_topic_reply_count 
    AFTER INSERT OR DELETE ON forum_posts 
    FOR EACH ROW EXECUTE FUNCTION update_topic_reply_info();

-- Function to update post like count
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE forum_posts 
        SET like_count = like_count + 1 
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE forum_posts 
        SET like_count = like_count - 1 
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for like count updates
CREATE TRIGGER update_post_likes_count 
    AFTER INSERT OR DELETE ON post_likes 
    FOR EACH ROW EXECUTE FUNCTION update_post_like_count();

-- Function to update study group member count
CREATE OR REPLACE FUNCTION update_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE study_groups 
        SET current_members = current_members + 1 
        WHERE id = NEW.group_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE study_groups 
        SET current_members = current_members - 1 
        WHERE id = OLD.group_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for group member count updates
CREATE TRIGGER update_study_group_members_count 
    AFTER INSERT OR DELETE ON study_group_members 
    FOR EACH ROW EXECUTE FUNCTION update_group_member_count();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_forum_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_bookmarks ENABLE ROW LEVEL SECURITY;

-- Forum Categories Policies (Public read, admin write)
CREATE POLICY "Public can view active categories" ON forum_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can view all categories" ON forum_categories FOR SELECT USING (auth.role() = 'authenticated');

-- Forum Topics Policies
CREATE POLICY "Anyone can view topics" ON forum_topics FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create topics" ON forum_topics FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update their topics" ON forum_topics FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete their topics" ON forum_topics FOR DELETE USING (auth.uid() = author_id);

-- Forum Posts Policies
CREATE POLICY "Anyone can view posts" ON forum_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON forum_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update their posts" ON forum_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete their posts" ON forum_posts FOR DELETE USING (auth.uid() = author_id);

-- User Forum Profiles Policies
CREATE POLICY "Anyone can view profiles" ON user_forum_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON user_forum_profiles FOR ALL USING (auth.uid() = user_id);

-- Study Groups Policies
CREATE POLICY "Anyone can view public groups" ON study_groups FOR SELECT USING (is_private = false OR auth.uid() = creator_id);
CREATE POLICY "Authenticated users can create groups" ON study_groups FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Creators can update their groups" ON study_groups FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Creators can delete their groups" ON study_groups FOR DELETE USING (auth.uid() = creator_id);

-- Study Group Members Policies
CREATE POLICY "Group members can view membership" ON study_group_members FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM study_groups WHERE id = group_id AND creator_id = auth.uid())
);
CREATE POLICY "Users can join groups" ON study_group_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave groups" ON study_group_members FOR DELETE USING (auth.uid() = user_id);

-- Private Messages Policies
CREATE POLICY "Users can view their messages" ON private_messages FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = recipient_id
);
CREATE POLICY "Users can send messages" ON private_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Notifications Policies
CREATE POLICY "Users can view their notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Post Likes Policies
CREATE POLICY "Anyone can view likes" ON post_likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can like posts" ON post_likes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can unlike their likes" ON post_likes FOR DELETE USING (auth.uid() = user_id);

-- Topic Bookmarks Policies
CREATE POLICY "Users can view their bookmarks" ON topic_bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can bookmark topics" ON topic_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their bookmarks" ON topic_bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Create default forum categories
INSERT INTO forum_categories (name, slug, description, color, icon, sort_order) VALUES
('General Discussion', 'general-discussion', 'General topics and introductions', '#3B82F6', 'MessageCircle', 1),
('OSCE Preparation', 'osce-preparation', 'Questions and tips about OSCE exam preparation', '#10B981', 'BookOpen', 2),
('Study Groups', 'study-groups', 'Find and organize study groups', '#F59E0B', 'Users', 3),
('Clinical Skills', 'clinical-skills', 'Discuss clinical procedures and techniques', '#EF4444', 'Stethoscope', 4),
('Communication Skills', 'communication-skills', 'Practice and improve patient communication', '#8B5CF6', 'MessageSquare', 5),
('Success Stories', 'success-stories', 'Share your OSCE success stories and experiences', '#06B6D4', 'Trophy', 6),
('Technical Support', 'technical-support', 'Get help with the platform and technical issues', '#6B7280', 'HelpCircle', 7);

COMMENT ON TABLE forum_categories IS 'Categories for organizing forum topics';
COMMENT ON TABLE forum_topics IS 'Main discussion topics in the forum';
COMMENT ON TABLE forum_posts IS 'Replies and responses to forum topics';
COMMENT ON TABLE user_forum_profiles IS 'Extended user profiles for forum-specific data';
COMMENT ON TABLE study_groups IS 'Study groups for collaborative learning';
COMMENT ON TABLE study_group_members IS 'Membership records for study groups';
COMMENT ON TABLE private_messages IS 'Private messages between users';
COMMENT ON TABLE notifications IS 'User notifications for forum activities';
COMMENT ON TABLE post_likes IS 'Likes/reactions on forum posts';
COMMENT ON TABLE topic_bookmarks IS 'User bookmarks for forum topics';

