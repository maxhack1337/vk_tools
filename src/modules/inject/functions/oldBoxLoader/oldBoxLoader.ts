import getLocalValue from "../../getLocalValue";

const oldBoxLoader = () => {
    if (getLocalValue('oldLoader'))
        document.arrive('#box_loader > .vkuiScreenSpinner__host', { existing: true }, (e) => {
            e.outerHTML = `
            <div class="pr pr_baw pr_medium" id="box_loader_pr" style="display: flex;">
                <div class="pr_bt"></div>
                <div class="pr_bt"></div>
                <div class="pr_bt"></div>
            </div>
            <div class="back"></div>
`
        });
}

export default oldBoxLoader;