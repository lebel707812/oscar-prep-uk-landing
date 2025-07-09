export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      achievement_definitions: {
        Row: {
          badge_reward: string | null
          category: string
          color: string | null
          created_at: string | null
          description: string
          difficulty: string | null
          icon_name: string | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          is_hidden: boolean | null
          name: string
          points_reward: number | null
          requirements: Json
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          badge_reward?: string | null
          category: string
          color?: string | null
          created_at?: string | null
          description: string
          difficulty?: string | null
          icon_name?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          is_hidden?: boolean | null
          name: string
          points_reward?: number | null
          requirements: Json
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          badge_reward?: string | null
          category?: string
          color?: string | null
          created_at?: string | null
          description?: string
          difficulty?: string | null
          icon_name?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          is_hidden?: boolean | null
          name?: string
          points_reward?: number | null
          requirements?: Json
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "achievement_definitions_badge_reward_fkey"
            columns: ["badge_reward"]
            isOneToOne: false
            referencedRelation: "badge_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      badge_definitions: {
        Row: {
          category: string
          color: string | null
          created_at: string | null
          description: string
          icon_name: string | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          name: string
          points_reward: number | null
          rarity: string | null
          requirements: Json | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string | null
          description: string
          icon_name?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          points_reward?: number | null
          rarity?: string | null
          requirements?: Json | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string | null
          description?: string
          icon_name?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          points_reward?: number | null
          rarity?: string | null
          requirements?: Json | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reading_time: number | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_challenges: {
        Row: {
          badge_reward: string | null
          challenge_date: string
          created_at: string | null
          description: string
          id: string
          is_active: boolean | null
          name: string
          points_reward: number | null
          requirements: Json
          updated_at: string | null
        }
        Insert: {
          badge_reward?: string | null
          challenge_date: string
          created_at?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          name: string
          points_reward?: number | null
          requirements: Json
          updated_at?: string | null
        }
        Update: {
          badge_reward?: string | null
          challenge_date?: string
          created_at?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          name?: string
          points_reward?: number | null
          requirements?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_challenges_badge_reward_fkey"
            columns: ["badge_reward"]
            isOneToOne: false
            referencedRelation: "badge_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_answers: {
        Row: {
          exam_session_id: string
          id: string
          is_correct: boolean
          question_id: string
          selected_option: string
        }
        Insert: {
          exam_session_id: string
          id?: string
          is_correct: boolean
          question_id: string
          selected_option: string
        }
        Update: {
          exam_session_id?: string
          id?: string
          is_correct?: boolean
          question_id?: string
          selected_option?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_answers_exam_session_id_fkey"
            columns: ["exam_session_id"]
            isOneToOne: false
            referencedRelation: "exam_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_sessions: {
        Row: {
          created_at: string | null
          finished_at: string | null
          id: string
          level: number
          score: number | null
          started_at: string
          time_spent: number | null
          topic_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          finished_at?: string | null
          id?: string
          level: number
          score?: number | null
          started_at?: string
          time_spent?: number | null
          topic_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          finished_at?: string | null
          id?: string
          level?: number
          score?: number | null
          started_at?: string
          time_spent?: number | null
          topic_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_sessions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: string
          is_solution: boolean | null
          like_count: number | null
          parent_post_id: string | null
          topic_id: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_solution?: boolean | null
          like_count?: number | null
          parent_post_id?: string | null
          topic_id?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_solution?: boolean | null
          like_count?: number | null
          parent_post_id?: string | null
          topic_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_parent_post_id_fkey"
            columns: ["parent_post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_posts_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          created_at: string | null
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          is_solved: boolean | null
          last_reply_at: string | null
          last_reply_by: string | null
          reply_count: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          is_solved?: boolean | null
          last_reply_at?: string | null
          last_reply_by?: string | null
          reply_count?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          is_solved?: boolean | null
          last_reply_at?: string | null
          last_reply_by?: string | null
          reply_count?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_topics_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard_definitions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          period: string | null
          slug: string
          sort_order: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          period?: string | null
          slug: string
          sort_order?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          period?: string | null
          slug?: string
          sort_order?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string | null
          related_id: string | null
          related_type: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          related_id?: string | null
          related_type?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          related_id?: string | null
          related_type?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      post_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      private_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          recipient_id: string | null
          sender_id: string | null
          subject: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          correct_option: string
          created_at: string | null
          explanation: string | null
          id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          topic_id: string
        }
        Insert: {
          correct_option: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          topic_id: string
        }
        Update: {
          correct_option?: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question_text?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      scenario_questions: {
        Row: {
          question_id: string
          question_order: number
          scenario_id: string
        }
        Insert: {
          question_id: string
          question_order: number
          scenario_id: string
        }
        Update: {
          question_id?: string
          question_order?: number
          scenario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scenario_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scenario_questions_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      scenarios: {
        Row: {
          created_at: string | null
          description: string
          difficulty_level: string
          id: string
          learning_objectives: string[] | null
          title: string
          topic_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          difficulty_level: string
          id?: string
          learning_objectives?: string[] | null
          title: string
          topic_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          difficulty_level?: string
          id?: string
          learning_objectives?: string[] | null
          title?: string
          topic_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scenarios_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string | null
          date: string | null
          feedback: string | null
          id: string
          score: number
          station_name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          feedback?: string | null
          id?: string
          score: number
          station_name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string | null
          feedback?: string | null
          id?: string
          score?: number
          station_name?: string
          user_id?: string
        }
        Relationships: []
      }
      study_group_members: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      study_groups: {
        Row: {
          created_at: string | null
          creator_id: string | null
          current_members: number | null
          description: string | null
          exam_date: string | null
          id: string
          is_active: boolean | null
          is_private: boolean | null
          max_members: number | null
          meeting_schedule: string | null
          name: string
          study_focus: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          current_members?: number | null
          description?: string | null
          exam_date?: string | null
          id?: string
          is_active?: boolean | null
          is_private?: boolean | null
          max_members?: number | null
          meeting_schedule?: string | null
          name: string
          study_focus?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          current_members?: number | null
          description?: string | null
          exam_date?: string | null
          id?: string
          is_active?: boolean | null
          is_private?: boolean | null
          max_members?: number | null
          meeting_schedule?: string | null
          name?: string
          study_focus?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      topic_bookmarks: {
        Row: {
          created_at: string | null
          id: string
          topic_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          topic_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          topic_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "topic_bookmarks_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          completed_at: string | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          progress: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          progress?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          progress?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievement_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          is_featured: boolean | null
          progress: Json | null
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          is_featured?: boolean | null
          progress?: Json | null
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          is_featured?: boolean | null
          progress?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badge_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_daily_challenge_progress: {
        Row: {
          challenge_id: string
          completed_at: string | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          progress: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          progress?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          progress?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_daily_challenge_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_forum_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          experience_level: string | null
          is_banned: boolean | null
          is_moderator: boolean | null
          last_seen_at: string | null
          location: string | null
          post_count: number | null
          reputation_score: number | null
          specialization: string | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          experience_level?: string | null
          is_banned?: boolean | null
          is_moderator?: boolean | null
          last_seen_at?: string | null
          location?: string | null
          post_count?: number | null
          reputation_score?: number | null
          specialization?: string | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          experience_level?: string | null
          is_banned?: boolean | null
          is_moderator?: boolean | null
          last_seen_at?: string | null
          location?: string | null
          post_count?: number | null
          reputation_score?: number | null
          specialization?: string | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      user_gamification_preferences: {
        Row: {
          created_at: string | null
          email_notifications: boolean | null
          featured_badge_id: string | null
          privacy_level: string | null
          push_notifications: boolean | null
          show_achievements: boolean | null
          show_badges: boolean | null
          show_leaderboards: boolean | null
          show_points: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_notifications?: boolean | null
          featured_badge_id?: string | null
          privacy_level?: string | null
          push_notifications?: boolean | null
          show_achievements?: boolean | null
          show_badges?: boolean | null
          show_leaderboards?: boolean | null
          show_points?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_notifications?: boolean | null
          featured_badge_id?: string | null
          privacy_level?: string | null
          push_notifications?: boolean | null
          show_achievements?: boolean | null
          show_badges?: boolean | null
          show_leaderboards?: boolean | null
          show_points?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_gamification_preferences_featured_badge_id_fkey"
            columns: ["featured_badge_id"]
            isOneToOne: false
            referencedRelation: "badge_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_leaderboard_entries: {
        Row: {
          created_at: string | null
          id: string
          leaderboard_id: string
          period_end: string | null
          period_start: string | null
          position: number
          score: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          leaderboard_id: string
          period_end?: string | null
          period_start?: string | null
          position: number
          score: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          leaderboard_id?: string
          period_end?: string | null
          period_start?: string | null
          position?: number
          score?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_leaderboard_entries_leaderboard_id_fkey"
            columns: ["leaderboard_id"]
            isOneToOne: false
            referencedRelation: "leaderboard_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          points_earned: number
          points_type: string
          source_id: string | null
          source_type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          points_earned?: number
          points_type: string
          source_id?: string | null
          source_type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          points_earned?: number
          points_type?: string
          source_id?: string | null
          source_type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          streak_data: Json | null
          streak_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_data?: Json | null
          streak_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_data?: Json | null
          streak_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_total_points: {
        Row: {
          created_at: string | null
          level: number
          points_to_next_level: number
          total_points: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          level?: number
          points_to_next_level?: number
          total_points?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          level?: number
          points_to_next_level?: number
          total_points?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users_meta: {
        Row: {
          country: string | null
          created_at: string | null
          full_name: string | null
          id: string
          profession: string | null
          user_id: string
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          profession?: string | null
          user_id: string
        }
        Update: {
          country?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          profession?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_badge: {
        Args: { p_user_id: string; p_badge_slug: string }
        Returns: boolean
      }
      award_points: {
        Args: {
          p_user_id: string
          p_points: number
          p_points_type: string
          p_source_id?: string
          p_source_type?: string
          p_description?: string
        }
        Returns: undefined
      }
      increment_topic_views: {
        Args: { topic_id: string }
        Returns: undefined
      }
      update_user_level: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      update_user_streak: {
        Args: {
          p_user_id: string
          p_streak_type: string
          p_activity_date?: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
