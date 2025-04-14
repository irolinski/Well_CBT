import { ToolNames } from "@/constants/models/home/activity_log";
import { getAnalytics, logEvent } from "./handleExpoGo";

export const logGoalsQuestionnaireAnswers = async (
  questionnaireState: string[],
) => {
  if (questionnaireState.length > 0) {
    const analyticsInstance = getAnalytics();
    if (!analyticsInstance) return;

    await Promise.all(
      questionnaireState.map((selectedOption) =>
        logEvent?.(analyticsInstance, "goals_questionnaire_answer", {
          goals_questionnaire_answer: selectedOption,
        }),
      ),
    );
  }
};

export const logShareQuoteEvent = () => {
  const analytics = getAnalytics();
  analytics && logEvent(analytics, "share_quote");
};

export const logOpenJournalEntryEvent = () => {
  const analytics = getAnalytics();
  analytics && logEvent(analytics, "browse_journal_entry");
};

export const logStartToolEvent = (toolName: ToolNames) => {
  const analytics = getAnalytics();
  analytics &&
    logEvent(analytics, "start_tool", {
      tool_name: toolName,
    });
};

export const logFinishToolEvent = (toolName: ToolNames) => {
  const analytics = getAnalytics();
  analytics &&
    logEvent(analytics, "finish_tool", {
      tool_name: toolName,
    });
};

export const logOpenArticleEvent = (articleId: number) => {
  const analytics = getAnalytics();
  analytics &&
    logEvent(analytics, "open_article", {
      article_id: articleId,
    });
};

export const logOpenAchievementsPageEvent = () => {
  const analytics = getAnalytics();
  analytics && logEvent(analytics, "open_achivements_page");
};
