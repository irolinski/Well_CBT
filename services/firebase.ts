import { ToolNames } from "@/constants/models/home/activity_log";
import { getAnalytics, logEvent } from "@react-native-firebase/analytics";

export const logGoalsQuestionnaireAnswers = async (
  questionnaireState: string[],
) => {
  if (questionnaireState.length > 0) {
    const analyticsInstance = getAnalytics();
    await Promise.all(
      questionnaireState.map((selectedOption) =>
        logEvent(analyticsInstance, "goals_questionnaire_answer", {
          goals_questionnaire_answer: selectedOption,
        }),
      ),
    );
  }
};

export const logShareQuoteEvent = () => {
  const analytics = getAnalytics();
  logEvent(analytics, "share_quote");
};

export const logOpenJournalEntryEvent = () => {
  const analytics = getAnalytics();
  logEvent(analytics, "browse_journal_entry");
};

export const logStartToolEvent = (toolName: ToolNames) => {
  const analytics = getAnalytics();
  logEvent(analytics, "start_tool", {
    tool_name: toolName,
  });
};

export const logFinishToolEvent = (toolName: ToolNames) => {
  const analytics = getAnalytics();
  logEvent(analytics, "finish_tool", {
    tool_name: toolName,
  });
};

export const logOpenArticleEvent = (articleId: number) => {
  const analytics = getAnalytics();
  logEvent(analytics, "open_article", {
    article_id: articleId,
  });
};

export const logOpenAchievementsPageEvent = () => {
  const analytics = getAnalytics();
  logEvent(analytics, "open_achivements_page");
};
