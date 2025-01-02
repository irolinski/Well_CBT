import { ArticleTypes } from "./learn";

export const learnArticles: ArticleTypes[] = [
  {
    title: "The art of mindful breathing",
    subtitle: "How breathing can make or break our anxieties?",
    time: 5,
    category: "Psychology",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_1.webp`),
      cardPlacementY: 37,
    },
    articleBody: [
      {
        header: "What does it mean to be mindful of one’s breath?",
        body: "Breathing is one of the only thing that we, as humans, do every day of our lives. Usually, though, living through our busy days, not very often, are we mindful of our breath.\n\nTo be mindful of one’s breath, means, in the most simple terms, to pay active attention to it, usually every now and then, everyday. ",
      },
      {
        header: "How does our breathing work?",
        body: "Our breaths are characterized by a number of characteristics - most notably by their pace and their depth. No style of breathing is in itself better than the other. When certain levels of hormones in our bodies are higher it is almost certain that our breathing will be faster and more shallow - it could be because of something stressful we’re experiencing but it could also be because of some physical activity we’re undertaking in that particular moment. When, however, we are deeply focused on something, or relaxed - our breathing will surely be much slower and deeper. ",
      },
      {
        header: "The breath-body-mind connection",
        body: "The way we breathe is closely tied to what we think and to the way our body feels. This however, can work two ways. Just like our breath can, thorough bodies response, become faster and more shallow when we’re exposed to stress, we can help to calm our bodies and our thoughts by working with our breath.",
      },
      {
        header: "How can I start working on my breathing?",
        body: "There are numerous ways you can work with your breath. For a holistic approach you may want to look into mindfulness meditation or find a therapist providing  ACT therapy in your vicinity.  Our app offers a bunch of ways to soothe your anxiety with breathing.",
      },
    ],
    relatedArticleIds: [],
    id: 1,
  },
  {
    title: "What is CBT?",
    subtitle: "The science-based psychotherapy explained",
    time: 4,
    category: "Psychology",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_2.webp`),
    },
    articleBody: [
      {
        header: "What is CBT?",
        body: "Cognitive Behavioral Therapy (CBT) is a widely used and evidence-based psychological treatment that focuses on the interplay between thoughts, feelings, and behaviors. The theory behind CBT is rooted in the understanding that the way we think significantly influences how we feel and act. While it was formally developed in the second half of the 20th century, many of its foundational concepts can be traced back to the Stoics of Ancient Greece, who emphasized the role of rational thinking in overcoming emotional struggles.",
      },
      {
        header: "The Practice",
        body: "CBT therapy can take various forms, offering flexibility to meet the needs of individuals from diverse backgrounds. Traditionally, CBT is delivered through one-on-one talk therapy sessions with a licensed therapist. These sessions focus on identifying negative thought patterns, understanding how they contribute to emotional or behavioral difficulties, and developing strategies to replace them with healthier perspectives. Therapy is often supplemented with homework exercises that encourage individuals to apply these techniques in their daily lives.\n\nBeyond traditional therapy, there are a variety of CBT-based tools available, including workbooks, guided programs, and apps, which some people find helpful either as supplements or as alternatives to face-to-face therapy. This versatility makes CBT accessible and adaptable to many different lifestyles and preferences.",
      },
      {
        header: "Efficacy",
        body: "According to the American Psychological Association (2017), Cognitive Behavioral Therapy has been shown to be effective in treating a wide range of conditions, including depression, anxiety disorders, substance use disorders, marital problems, eating disorders, and severe mental illness. Research consistently demonstrates that CBT leads to significant improvements in quality of life and daily functioning. In many studies, CBT has proven to be as effective as, or even more effective than, other forms of psychological therapy or psychiatric medications.",
      },
      {
        header: "How to start with CBT?",
        body: "This app integrates some of the techniques traditionally used in Cognitive Behavioral Therapy. You can find those under 'Thought Exercises' label in 'Tools'. While it may prove highly effective for many, it is important to note that it is not a substitute for seeing a licensed medical practitioner, which we thoroughly recommend to anyone considering it.",
      },
    ],
    relatedArticleIds: [],
    id: 2,
  },
  {
    title: "The Role of Diet in Mental Health",
    subtitle: "Insights from the Gut-Brain Axis",
    time: 6,
    category: "Science",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_3.webp`),
      cardPlacementY: 19,
    },
    articleBody: [
      {
        header: "Gut Microbiome and Mental Health",
        body: "Emerging research highlights the significant impact of diet on mental health, with a particular focus on the gut-brain axis. This complex communication network connects the gut microbiome—comprising trillions of microorganisms—to the central nervous system, playing a pivotal role in regulating mood and cognitive function.\n\nThe gut microbiome affects brain health through multiple pathways, including the production of neurotransmitters like serotonin and dopamine, which influence mood. Studies show that imbalances in gut bacteria, such as an overgrowth of Eggerthella or a depletion of Subdoligranulum, are associated with depressive symptoms. These findings underscore the role of gut health in emotional well-being.",
      },
      {
        header: "The Impact of Diet",
        body: "According to the researches of Monash University, our diet directly influences our gut microbiome's composition and diversity. Fiber-rich foods such as vegetables, fruits, legumes, and whole grains promote beneficial bacterial growth. Similarly, omega-3 fatty acids, found in fatty fish and flaxseeds, support mental health by reducing inflammation and promoting the growth of microbes like Subdoligranulum.\n\n There is also strong evidence that individuals adhering to a Mediterranean diet—a regimen rich in plant-based foods, healthy fats, and lean proteins—are less likely to experience mental health issues compared to those consuming a Western diet (Butler, Mörkl, 2023).​",
      },
      {
        header: "Research Backing",
        body: "A very recent study (Radjabzadeh et al., 2022) analyzed gut microbiota and depression among 2,539 participants, linking specific bacterial profiles to mental health outcomes. The findings emphasize that diet and gut health are not just important for physical health but also crucial for psychological well-being.",
      },
      {
        header: "Practical Steps for a Mental Health-Friendly Diet",
        body: "Is there anything you can do right now in order make sure your gut microbiota is as healthy as it can be? Dietary changes are not always an easy thing to tackle by yourself so, first of all, we recommend to consult a trusted clinical nutrition and dietetics specialist. However, to give you an overall idea: here are a few general tip:\n\n 1. Increase Fiber Intake: Add more whole foods like fruits, vegetables, and legumes to your diet. \n\n2. Incorporate Healthy Fats: Include sources of omega-3 fatty acids, such as salmon, walnuts, and chia seeds. \n\n3. Avoid Processed Foods: Limit sugary snacks and fast food, which may harm gut health. \n\n4. Consider Probiotics and Fermented Foods: Foods like yogurt, kefir, and kimchi can enhance beneficial bacteria in the gut. \n\n",
      },
    ],
    relatedArticleIds: [],
    id: 3,
  },
  {
    title: "The Impact of Social Media on Mental Health",
    subtitle: "A Look at the Latest Evidence",
    time: 7,
    category: "Science",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_4.webp`),
      cardPlacementY: 26,
    },
    articleBody: [
      {
        header: "Introduction",
        body: "Social media, in the West, plays a central role in modern life, especially among younger populations. While it offers opportunities for connection, creativity, and support, its potential negative effects on mental health are becoming increasingly recognized in scientific literature. Research indicates that the relationship between social media use and mental health is complex, with varying outcomes depending on the type, duration, and nature of interactions.",
      },
      {
        header: "Negative Impacts",
        body: "There are various mechanisms through which social media influences mental health. Studies have shown that social comparison, especially upward comparison on social media, can lead to increased feelings of inadequacy (Fardouly et al., 2015). Cyberbullying is another key factor, significantly contributing to anxiety and depression in young users (Kowalski et al., 2014). Additionally, social media use, particularly late-night scrolling, disrupts sleep patterns, which in turn affects mental health (Levenson et al., 2016). Studies suggest that specific behaviors, such as frequent exposure to idealized images and negative feedback, may exacerbate these issues (Galea & Buckley, 2024). Adolescents, in particular, are more susceptible due to developmental vulnerabilities and the importance of peer validation during this stage.",
      },
      {
        header: "Positive Aspects",
        body: "On the other hand, social media can also offer some benefits. Research highlights that when used to foster meaningful connections, social media can reduce feelings of isolation and provide access to supportive communities, particularly for marginalized groups (Naslund et al., 2020). These benefits may be useful in making the case for the importance of mindful social media use.",
      },
      {
        header: "Recommendations",
        body: 'To mitigate risks, experts recommend setting time limits, curating positive and supportive content, and incorporating "digital detox" periods. Parental involvement and media literacy education can also play critical roles in helping adolescents navigate social media in healthier ways.',
      },
      {
        header: "Conclusion",
        body: "Social media's impact on mental health is multifaceted. While it can often exacerbate mental health challenges, it also holds the potential to enhance well-being through connection and support. The key, most probably, lies in mindful and balanced use, supported by ongoing research to better understand its effects.",
      },
    ],
    relatedArticleIds: [],
    id: 4,
  },
  {
    title: "How to get a Good Night's Sleep",
    subtitle: "7 science-backed rituals",
    time: 5,
    category: "Lifestyle",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_5.webp`),
      cardPlacementY: 47,
    },
    articleBody: [
      {
        header: "1. Establish a Consistent Sleep Schedule",
        body: "Maintaining regular sleep and wake times helps regulate the body’s circadian rhythm, improving sleep quality. Research supports that irregular sleep schedules disrupt this rhythm and increase sleep disorders (Watson et al., 2017).",
      },
      {
        header: "2. Create a Relaxing Pre-Sleep Routine",
        body: "Calming activities such as reading or mindfulness meditation can prepare the brain for sleep. Mindfulness techniques have been shown to alleviate insomnia and enhance sleep quality (Black et al., 2015).",
      },
      {
        header: "3. Limit Screen Exposure",
        body: "Blue light from devices inhibits melatonin production, delaying sleep onset. Avoiding screens at least one hour before bed improves sleep duration and quality (Chang et al., 2015).",
      },
      {
        header: "4. Optimize Your Sleep Environment",
        body: "A quiet, dark, and cool room is ideal for better sleep. Studies show that noise and light disturbances negatively impact sleep, while a room temperature around 65°F (18°C) promotes restful sleep (Basner et al., 2014).",
      },
      {
        header: "5. Avoid Stimulants in the Evening",
        body: "Caffeine consumption as late as six hours before bedtime significantly reduces total sleep time. Avoid caffeine, alcohol, and heavy meals in the evening for better sleep (Drake et al., 2013).",
      },
      {
        header: "6. Exercise Regularly",
        body: "Moderate exercise improves sleep efficiency and reduces the time needed to fall asleep. However, intense exercise close to bedtime may impair sleep (Kredlow et al., 2015).",
      },
      {
        header: "7. Practice Stress Management",
        body: "Techniques like deep breathing or progressive muscle relaxation help reduce stress hormones and promote relaxation before bed (Morin & Espie, 2009).",
      },
    ],
    id: 5,
  },
  {
    title: "Relax with the classics",
    subtitle: "10 Classical Music Pieces to Unwind and Relax To",
    time: 3,
    category: "Lifestyle",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_6.webp`),
      cardPlacementY: 0,
    },
    articleBody: [
      {
        header: "Clair de Lune – Claude Debussy",
        body: "This piano masterpiece evokes serene moonlit nights.\nRecommended Recording: Arturo Benedetti Michelangeli (Deutsche Grammophon).",
      },
      {
        header: "Adagio for Strings – Samuel Barber",
        body: "Known for its emotional depth, this string composition provides a meditative listening experience.\nRecommended Recording: Leonard Slatkin and the St. Louis Symphony (RCA).",
      },
      {
        header: "Gymnopédie No. 1 – Erik Satie",
        body: "A minimalist piece that blends simplicity and beauty.\nRecommended Recording: Aldo Ciccolini (EMI).",
      },
      {
        header: "Canon in D – Johann Pachelbel",
        body: "Its repetitive harmony creates a soothing, timeless quality.\nRecommended Recording: Sir Neville Marriner and the Academy of St Martin in the Fields (Philips).",
      },
      {
        header: "The Swan – Camille Saint-Saëns",
        body: "This cello solo from The Carnival of the Animals flows gracefully, like the bird it depicts.\nRecommended Recording: Yo-Yo Ma and Kathryn Stott (Sony Classical).",
      },
      {
        header: "Pavane – Gabriel Fauré",
        body: "A delicate, nostalgic orchestral work.\nRecommended Recording: Charles Dutoit and the Montreal Symphony Orchestra (Decca).",
      },
      {
        header: "Meditation from Thaïs – Jules Massenet",
        body: "A lush violin solo perfect for introspection.\nRecommended Recording: Joshua Bell with the Academy of St Martin in the Fields (Sony Classical).",
      },
      {
        header: "Nocturne in E-flat Major, Op. 9, No. 2 – Frédéric Chopin",
        body: "This lyrical piano piece gently captivates with its melodic flow.\nRecommended Recording: Vladimir Horowitz (Sony Classical).",
      },
      {
        header: "Air on the G String – Johann Sebastian Bach",
        body: "A serene and timeless piece from Bach’s Orchestral Suite No. 3.\nRecommended Recording: Yehudi Menuhin and the Bath Festival Orchestra (EMI).",
      },
      {
        header: "Largo from Symphony No. 9 – Antonín Dvořák",
        body: "Known as 'Going Home,' this movement is deeply calming and reflective.\nRecommended Recording: Berlin Philharmonic, Herbert von Karajan (Deutsche Grammophon).",
      },
    ],
    id: 6,
  },
  {
    title: "CBT Outside the Therapist's Office",
    subtitle: "Exploring the Efficacy of Non-Therapeutic CBT Interventions",
    time: 6,
    category: "Science",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_7.webp`),
      cardPlacementY: 35,
    },
    articleBody: [
      {
        header: "Bibliotherapy in CBT",
        body: "Cognitive Behavioral Therapy (CBT) is well-recognized for its efficacy in addressing mental health challenges through traditional psychotherapy (talk therapy). However, non-traditional, self-guided applications of CBT, such as bibliotherapy and mobile applications, have also demonstrated effectiveness in certain contexts. These approaches leverage the principles of CBT without requiring in-person sessions with a therapist, making them more accessible and scalable. Below, we discuss the research behind these interventions.",
      },
      {
        header: "Bibliotherapy in CBT",
        body: "Bibliotherapy involves using books and written materials grounded in CBT principles to guide individuals in identifying and altering negative thought patterns. Studies have found this approach effective for mild to moderate symptoms of anxiety and depression. For instance, Gregory et al. (2021) conducted a meta-analysis of bibliotherapy interventions and observed significant reductions in depressive symptoms compared to control groups.",
      },
      {
        header: "CBT Apps",
        body: "Mobile applications offering CBT tools have grown in popularity, particularly for treating depression and anxiety. These tools use interactive modules to teach CBT concepts like cognitive restructuring and behavioral activation. Research systematically reviewed by Firth et al. (2017) indicates that smartphone apps incorporating CBT techniques can reduce depressive symptoms, with comparable effects to face-to-face interventions in some cases.",
      },
      {
        header: "Efficacy and Reach",
        body: "A systematic review by Huguet et al. (2016) highlights the efficacy of apps in reaching individuals who might otherwise not seek help due to stigma or lack of resources. Nevertheless, variability in app quality and lack of regulation remain challenges.",
      },
      {
        header: "Combining Approaches",
        body: "Innovative combinations of bibliotherapy and digital CBT tools are emerging. Internet-based CBT (iCBT) platforms often incorporate bibliotherapy principles while offering interactive elements, such as virtual exercises and self-monitoring tools. Shirotsuki et al. (2017) demonstrated the efficacy of brief internet-based CBT programs supplemented with psychoeducational materials, observing significant improvements in anxiety and somatic symptoms among Japanese workers.",
      },
      {
        header: "Limitations and Future Directions",
        body: "Non-therapeutic CBT approaches are not without limitations. For instance, adherence can be low, and individuals with severe symptoms may require professional guidance. However, ongoing research is refining these interventions, with promising innovations like artificial intelligence to personalize CBT delivery.",
      },
    ],
    id: 7,
  },
];
