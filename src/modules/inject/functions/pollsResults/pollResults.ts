import fromId from "../../../content/fromId";
import getAnswerProps from "./getAnswerProps";
import 'arrive';

const pollResults = () => {
if (localStorage.getItem("pollResultsValue") === "true") {
  document.arrive(
    "[class^='vkitPrimaryAttachmentPoll__voting']",
    { existing: true },
    function (e) {
      let styleElement = fromId("PollResultsShow");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "PollResultsShow";
        document.head.appendChild(styleElement);
      }
      styleElement.innerHTML =
        '.VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionVotes"] { opacity: .4; } .VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionRight"] { opacity: 1; transform: translateX(0); } [class*="vkitPollOptions__votingOptionsVoted"] [class^="vkitPollOptions__votingOptionRight"] { margin-right: 0px !important; } div:has(>[class^="vkitPollOptions__votingOptionCheckboxIcon"]>svg)>[class^="vkitPollOptions__votingOptionRight"] { margin-right: 28px; } [class*="vkitPollOptions__votingOptionsVoted"] [class^="vkitPollOptions__votingOptionCheckboxIcon"] { display: none !important; } .VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionFill"] { opacity: .06 } [class*="vkitPollOptions__votingOptionsDark"].VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionFill"] { opacity: .12 }';
      var polls = document.querySelectorAll(
        '[class^="vkitPollOptions__votingOptions"]'
      );
      for (var poll of polls) {
        poll.classList.add("VKEnhancer-module__votingOptionsVoted");
      }
      var percentageElements = document.querySelectorAll(
        '[class^="vkitPollOptions__votingOptionRight"]'
      );
      percentageElements.forEach(function (element) {
          if (element.textContent) {
              var percentage = parseFloat(element.textContent.replace("%", ""));
              var parentElement = element.closest(
                  '[class^="vkitPollOptions__votingOptionWrapper"]'
              );
              var fillElement = parentElement?.querySelector(
                  '[class^="vkitPollOptions__votingOptionFill"]'
              );
              if (fillElement instanceof HTMLElement) fillElement.style.width = percentage + "%";
          }
        });
    }
  );
    document.arrive(
    "[class^='vkitModalBody__container'] > [class^='vkitPollOptions__votingOptionsWrapper']",
    { existing: true },
    function (e) {
      let styleElement = fromId("PollResultsShow");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "PollResultsShow";
        document.head.appendChild(styleElement);
      }
      styleElement.innerHTML =
        '.VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionVotes"] { opacity: .4; } .VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionRight"] { opacity: 1; transform: translateX(0); } [class*="vkitPollOptions__votingOptionsVoted"] [class^="vkitPollOptions__votingOptionRight"] { margin-right: 0px !important; } div:has(>[class^="vkitPollOptions__votingOptionCheckboxIcon"]>svg)>[class^="vkitPollOptions__votingOptionRight"] { margin-right: 28px; } [class*="vkitPollOptions__votingOptionsVoted"] [class^="vkitPollOptions__votingOptionCheckboxIcon"] { display: none !important; } .VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionFill"] { opacity: .06 } [class*="vkitPollOptions__votingOptionsDark"].VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionFill"] { opacity: .12 }';
      var polls = document.querySelectorAll(
        '[class^="vkitPollOptions__votingOptions"]'
      );
      for (var poll of polls) {
        poll.classList.add("VKEnhancer-module__votingOptionsVoted");
      }
      var percentageElements = document.querySelectorAll(
        '[class^="vkitPollOptions__votingOptionRight"]'
      );
        percentageElements.forEach(function (element) {
            if (element.textContent) {
                var percentage = parseFloat(element.textContent.replace("%", ""));
                var parentElement = element.closest(
                    '[class^="vkitPollOptions__votingOptionWrapper"]'
                );
                var fillElement = parentElement?.querySelector(
                    '[class^="vkitPollOptions__votingOptionFill"]'
                );
                if (fillElement instanceof HTMLElement) fillElement.style.width = percentage + "%";
            }
        });
    }
  );
    document.arrive(".media_voting", { existing: true }, async function (e) {
        if (e instanceof HTMLElement){
            let pollOid = e.dataset.ownerId;
    
        let pollId = e.dataset.id;
        let pollRes = await vkApi.api("polls.getById", {
            owner_id: pollOid,
            poll_id: pollId,
        });

        pollRes.answers.forEach((option: any) => {
            let optionWrap = document.querySelector(
                `._media_voting_option${option.id}`
            );
            if (optionWrap) {
                let percentElem = optionWrap.querySelector(
                    ".media_voting_option_percent"
                );
                if(percentElem?.textContent) percentElem.textContent = option.rate?.toString;

                let barElem = optionWrap.querySelector(".media_voting_option_bar");
                if (barElem instanceof HTMLElement) barElem.style.transform = `scaleX(${option.rate / 100})`;

                let countElem = optionWrap.querySelector(".media_voting_option_count");
                countElem?.classList.remove("media_voting_option_count_hidden");
                if (countElem instanceof HTMLElement && countElem !== null) {
                    const counterElement = countElem.querySelector(".media_voting_option_counter");
                    if (counterElement) {
                        counterElement.innerHTML = `<span class="media_voting_separator">⋅</span><span>${option.votes}</span>`;
                    }
                }
            }
        });
        let styleElement = fromId("PollResultsShowSecondary");
        if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = "PollResultsShowSecondary";
            document.head.appendChild(styleElement);
        }
        styleElement.innerHTML =
            ".media_voting_multiple .media_voting_option_text::after{right:52px!important;}";
    }
});

  document.arrive(".AttachPoll__answers", { existing: true }, async function (
    e
  ) {
    const answerElements = e.querySelectorAll(".AttachPoll__answer");
    answerElements.forEach((element) => {
      const [votes, rate] = getAnswerProps(element);
      const revealAnswers = document.createElement("span");
      revealAnswers.classList.add("vkEnAnswerCount");
      revealAnswers.textContent = `${rate}%`;
      const rightAnswer = element.getElementsByClassName(
        "AttachPoll__answerRight"
      )[0];
      rightAnswer.prepend(revealAnswers);
      const revealVotes = document.createElement("span");
      revealVotes.classList.add("vkEnAnswerVotes");
      revealVotes.textContent = ` ⋅ ${votes}`;
      rightAnswer?.parentNode?.insertBefore(revealVotes, rightAnswer);
      const answerBar = element.getElementsByClassName(
        "AttachPoll__answerBar"
      )[0];
      if (answerBar instanceof HTMLElement && rate) answerBar.style.transform = `scaleX(${rate / 100})`;
    });
  });

  let styleElement = fromId("PollResultsShowAttach");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "PollResultsShowAttach";
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".AttachPoll__answer--voted .vkEnAnswerVotes, .AttachPoll__answer--voted .vkEnAnswerCount{display:none!important;}.vkEnAnswerVotes{display:contents;color:var(--vkui--color_text_subhead);}.vkEnAnswerCount{padding-right: 6px; line-height: 16px; font-size: 13px; color: var(--vkui--color_text_primary); font-weight: 600; -webkit-font-smoothing: subpixel-antialiased; -moz-osx-font-smoothing: auto; white-space: nowrap; text-align: right; z-index: 1; transition: opacity .1s,transform .1s;}";
}
}
export default pollResults;