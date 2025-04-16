import { ToolNames } from "@/constants/models/home/activity_log";
import { getAnalytics, logEvent } from "./handleExpoGo";

export const analyticsLogGoalsQuestionnaireAnswers = async (
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

export const analyticsLogShareQuoteEvent = () => {
  const analytics = getAnalytics();
  analytics && logEvent(analytics, "share_quote");
};

export const analyticsLogOpenJournalEntryEvent = () => {
  const analytics = getAnalytics();
  analytics && logEvent(analytics, "browse_journal_entry");
};

export const analyticsLogStartToolEvent = (toolName: ToolNames) => {
  const analytics = getAnalytics();
  analytics &&
    logEvent(analytics, "start_tool", {
      tool_name: toolName,
    });
};

export const analyticsLogFinishToolEvent = (toolName: ToolNames) => {
  const analytics = getAnalytics();
  analytics &&
    logEvent(analytics, "finish_tool", {
      tool_name: toolName,
    });
};

export const analyticsLogOpenArticleEvent = (articleId: number) => {
  const analytics = getAnalytics();
  analytics &&
    logEvent(analytics, "open_article", {
      article_id: articleId,
    });
};

export const analyticsLogOpenAchievementsPageEvent = () => {
  const analytics = getAnalytics();
  analytics && logEvent(analytics, "open_achivements_page");
};
