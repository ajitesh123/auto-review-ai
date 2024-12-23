import { create } from 'zustand';
import {
  ConversationTemplate,
  conversationTemplates,
} from '@app/ai-conversation-coach/constants/coach-templates';

interface AICoachTemplatesState {
  templates: ConversationTemplate[];
}

export const useAICoachTemplatesStore = create<AICoachTemplatesState>(
  (set, get) => ({
    templates: conversationTemplates,
  })
);
