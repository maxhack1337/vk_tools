const backSupport = () => {
    document.arrive('.faq_tabs:not(:has([href="support?act=new"]))', { existing: true }, function (e) {
        let isAlready = !document.querySelector('.vkEnhancerSupportLink');
        if (isAlready) {
            let support = document.createElement('a');
            support.id = "new_link";
            support.classList.add('vkEnhancerSupportLink');
            try {
                support.innerText = getLang?.('support_ask_question') || 'Задать вопрос';
            } catch (error) {
                support.innerText = 'Задать вопрос';
            }
            support.href = "https://vk.com/support?act=new&from=pass_faq";
            support.setAttribute('style',"float:right;padding-bottom:0px;padding-left:10px;padding-right:10px;padding-top:16px;text-decoration-line:none;text-decoration-style:solid;text-decoration-thickness:auto;");
            e.appendChild(support);
        }
    });

    document.arrive('.tickets_new_link', { existing: true }, function (e) {
	    e.remove();
    });
}

export default backSupport;