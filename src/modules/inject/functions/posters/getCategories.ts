const nameIds: { [key: string]: [string, number[], string[], string[]] } = {
    picture: [
        'Картинки',
        [49, 46, 65, 61, 13, 16, 34, 11, 20, 63, 15, 19, 48, 14, 18, 33, 47, 17, 69, 12, 37, 31, 51, 66],
        ['FFFFFF', '777BB4', 'FFFFFF', '464390', '000000', 'FFFFFF', '575A6D', 'FFFFFF', 'FFFFFF', 'FFFFFF', '2A3535', 'FFFFFF', 'FFFFFF', 'FFFFFF', '390722', '4F5970', 'FFFFFF', '591100', 'FFFFFF', 'FFFFFF', 'E1C1A2', 'FFFFFF', 'FFFFFF', '19191A'],
        [
            'https://sun1-91.userapi.com/5CVgm8QxpQsDRbqvjVlQxjWSOMSRNaNHYqKHlA/4AVehkT1yro.jpg',
            'https://sun1-23.userapi.com/tnoDFDBcWD9wMgW49b5KjR7poTzG-UcYrKiipg/3JafunFFIEI.jpg',
            'https://sun1-16.userapi.com/TVnam72mt-ckFoBDWDvLybM_iGZalUw4GVcIzA/3ZbARNXhr_A.jpg',
            'https://sun1-19.userapi.com/oYqJ6ojRGXpmk3cGn4zQdtEHRDH1A6osfNhpaQ/xqVslxeC6PI.jpg',
            'https://sun1-30.userapi.com/Wm571lwlCA1k02sPKRnAakeS0fbhGw8gkIUwGQ/7S9uuMVs_JA.jpg',
            'https://sun1-95.userapi.com/g19KE6aBMX8aDPymprJfP_XM3rnALjO1FzEGyg/WWbI3Jyt-hY.jpg',
            'https://sun1-98.userapi.com/KoU0YMb7phsC6xLZbQ38PVH5dssbU_3dfdG63Q/UUzUtA0mnXk.jpg',
            'https://sun1-54.userapi.com/ZtzV-sBhzQ_SCKCAdH5ssgHSOjE_Vep-8yjeQQ/kHUfHji7EoM.jpg',
            'https://sun1-24.userapi.com/c6D9fArxX7L_H9hDETJz3qG7xlad89c4v4BJUw/3YKtcr2dw8M.jpg',
            'https://sun1-30.userapi.com/SlpVeEIb5mhbnMJWoOy_wDXYyxjs4k0heMU0wg/Zl6bBKuEh90.jpg',
            'https://sun1-92.userapi.com/tAzdyd-N7DYCgnmvB65IoXWPT6mmUAsrYvt75w/xzbWRdO1AE4.jpg',
            'https://sun1-16.userapi.com/FQYaUs0N1_ULo4f_zSn0wJdSQwO1n9nyhPKBfg/O4h6JMXEfMg.jpg',
            'https://sun1-21.userapi.com/VP8dGlw5YxLB4-LHgUaizmyxYlHKf1PMifEJyg/dU5l9BXyEOc.jpg',
            'https://sun1-26.userapi.com/AoCcaeQ3FBsbgZTDX9pFnkORrudRD1im0Tc5dg/pU5L0LTAWVk.jpg',
            'https://sun1-86.userapi.com/XZWjZT_EKfcrj5JUJ-Z_KVd53iPC8s9uw52gXg/9TJZijGTOo4.jpg',
            'https://sun1-84.userapi.com/30S5lDgAc8_-ujKKIZLIcKeuptQHgW-J4G8qmw/3RpWyGZJweE.jpg',
            'https://sun1-98.userapi.com/dcFP8xlMRjavBKjvp27P1grpZaGH0c-ugsQLQw/d-SAjr41Ch0.jpg',
            'https://sun1-92.userapi.com/B2VtXeGKr26XPPxyyzJoZAwGAq_HfqtR4-6N3Q/DZTZr_RPgaw.jpg',
            'https://sun1-22.userapi.com/5gr4YbIeu8r2uNBdm1Oi-iTYqN-khe02588XjQ/I3ot5rue7eo.jpg',
            'https://sun1-56.userapi.com/iPMEnz4l3cUvfC7YGrzkAjKV4aKfehbRoDpWDA/IxOPmtMiCGg.jpg',
            'https://sun1-83.userapi.com/kkP7Md0rHfpsTy1Ex7Y7FLrsturiJjWq1H7zAA/ylqGxeTItes.jpg',
            'https://sun1-22.userapi.com/BFJoA8DzWkpRdMXfHP1D4FftTiAIVLVKmRp6Dw/uLBsr4KA6BU.jpg',
            'https://sun1-19.userapi.com/-WpB4n1f9CfkVDg1_cVnb5bavzcs-Md_gN5Eaw/qwwNq72gyxI.jpg',
            'https://sun1-14.userapi.com/d9to5zk0qZ2-hW47g6WDgmNmYTFm6HzR_ivEZA/yn-Ij1Z9cOg.jpg'
        ]
    ],
    emoji: [
        'Эмоции',
        [30, 35, 26, 29, 36, 21, 25, 24, 27, 22, 23, 28],
        ['000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000'],
        [
            'https://sun1-85.userapi.com/KFSMBYmw8Ti7SXOH_o0pZujnGU-pDpFlfZXmMg/H8lQeavpe00.jpg',
            'https://sun1-96.userapi.com/N6cRL2s7aCHfyG3bf9iAejgijpnwT_4aVn8X1w/2EJ0kdgF4Kg.jpg',
            'https://sun1-87.userapi.com/Wag9Dor_FjnIpH3I958OEPPRyFizWOyKoyrx2w/M5skr1WR9kg.jpg',
            'https://sun1-85.userapi.com/qp1EnN92rtZ2y4vj0FhUJb5NffemfFJPKo-H2g/X098I_FKzxY.jpg',
            'https://sun1-15.userapi.com/2ej1j92VkvaytY8y1Ho0ByMD706CnzNk97oo4w/ln8pXbC0yfA.jpg',
            'https://sun1-30.userapi.com/oQwFUyBuS0gDqGtO9UayuHyjLV-v1QHZdYryMQ/PkpdeMrEJFQ.jpg',
            'https://sun1-15.userapi.com/67FmkyyO7UnnHGVjCp5R0d9QytBw5dnF2MY0Hg/rK-QnzUCiEI.jpg',
            'https://sun1-95.userapi.com/994BmjOwJ4YtE2jQChdr_RwsYBfRJYKr7CD8-w/CpCM7vqPKtk.jpg',
            'https://sun1-24.userapi.com/7X_sEkP3F7FvgEoj9IhUmnedBR3GRHyk0GOIzA/1D_Wk0d0oZk.jpg',
            'https://sun1-88.userapi.com/KW5oY9OEHrKhUufK4rhiGY8N5FkJisTzQglpVw/aZ14SC3HjHQ.jpg',
            'https://sun1-91.userapi.com/vb0qZ6-Hl750bYhWljLzsqtpn__qd6YPeP4rYw/XPHPWBlQTSk.jpg',
            'https://sun1-86.userapi.com/PIuHQjeQEud6BNa1ybi1t77ChyyPlCO7uU6cOg/nyalFhZ0_YM.jpg'
        ]
    ],
    gradient: [
        'Градиенты',
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ['26203E', 'FFFFFF', 'FFFFFF', '133C5C', 'FFFFFF', 'FFFFFF', '481B49', 'FFFFFF', '5B260D', 'FFFFFF'],
        [
            'https://sun1-94.userapi.com/X3ivWlf00Szk5rTaa6rPx56ILtLi6KuWFynWIQ/cn9emLQqqjU.jpg',
            'https://sun1-25.userapi.com/OPWRPKj8aREB7Nv2G-X76HyAn_cBt2I4aK125Q/vZhCfwmsjdM.jpg',
            'https://sun1-85.userapi.com/lrn0TNt49Zq2Ix25kghDYXRLIEmUtP49PAlFPA/TtnyGvxCnjo.jpg',
            'https://sun1-94.userapi.com/ri9A-chLRv_qo3TY2PT5V02giyW3QqWRyeM84w/5c_F6KTCQfY.jpg',
            'https://sun1-18.userapi.com/oeNoLxRCLaRWWdY8ypTDpSLF8cbPr_ZPuZrrkg/gyuPqkXDdE4.jpg',
            'https://sun1-89.userapi.com/qif0lP5kdN3XlmBP_xWJLkrPQSIGhZ294imZ6Q/c9_ZzWRXBbA.jpg',
            'https://sun1-28.userapi.com/BH9aSUf5SJr1Ns1eiifiM2V_3FZ_4knMpPZ61w/LwXrxTsQEFM.jpg',
            'https://sun1-21.userapi.com/FiKo6JyRIWfvzenjUAanQNsY8ZzJhRGBN3tqaA/GqM90JV5120.jpg',
            'https://sun1-25.userapi.com/moQM0WVqWPq3MW_Vt7b-w-TEpI2Dk2nFGozX6g/fK6-aAFXXVg.jpg',
            'https://sun1-89.userapi.com/6N5l7yUQLAt3sWJYVBeF8Fi4f9fznnBVtF6Ffg/hef_wSq8c5U.jpg'
        ]
    ]
}
const authorName = 'VK Tools';
const authorLink = 'vk.com/vkenhancer';

const getCategories = () => {
    let categoriesObj:any[] = [];

    Object.keys(nameIds).forEach(nameId => {
        let categoryId = nameId;
        let categoryName = nameIds[categoryId][0];
        let categoryBkgIds = nameIds[categoryId][1];

        let bkgsObj:any[] = [];
        let i = 0;
        categoryBkgIds.forEach(bkgId => {
            let bkgObj = {
                id: `0_${bkgId}`,
                author_name: authorName,
                author_link: authorLink,
                background_name: `${nameId}_${bkgId}`,
                main_color: 'fff',
                text_color: nameIds[categoryId][2][i],
                preview: nameIds[categoryId][3][i],
                preview_2x: nameIds[categoryId][3][i],
                urls: {
                    main: [
                        {
                            width: 369,
                            height: 277,
                            url: nameIds[categoryId][3][i]
                        }
                    ]
                }
            };
            bkgsObj.push(bkgObj);
            i++;
        });
        
        let caregoryObj = {
            'bkgs': bkgsObj,
            'id': categoryId,
            'name': categoryName
        };

        categoriesObj.push(caregoryObj);
    });

    return categoriesObj;
}

export default getCategories;