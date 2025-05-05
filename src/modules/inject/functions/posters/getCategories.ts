import getCategoriesLang from "./getCategoriesLang";

type ImageObject = {
  url: string;
  width: number;
  height: number;
};

type QueryType = ImageObject[][];

const authorName = "VK Tools";
const authorLink = "vk.com/vkenhancer";

const getCategories = (lang: number) => {
  let categoriesObj: any[] = [];
  const nameIds: { [key: string]: [string, number[], string[], string[], QueryType] } = {
    picture: [
      getCategoriesLang(lang)[0] || "Картинки",
      [49, 46, 65, 61, 13, 16, 34, 11, 20, 63, 15, 19, 48, 14, 18, 33, 47, 17, 69, 12, 37, 31, 51, 66, 64, 60],
      ["FFFFFF", "777BB4", "FFFFFF", "464390", "000000", "FFFFFF", "575A6D", "FFFFFF", "FFFFFF", "FFFFFF", "2A3535", "FFFFFF", "FFFFFF", "FFFFFF", "390722", "4F5970", "FFFFFF", "591100", "FFFFFF", "FFFFFF", "E1C1A2", "FFFFFF", "FFFFFF", "19191A", "3B4052", "DB3755"],
      [
        "https://sun1-91.userapi.com/5CVgm8QxpQsDRbqvjVlQxjWSOMSRNaNHYqKHlA/4AVehkT1yro.jpg",
        "https://sun1-23.userapi.com/tnoDFDBcWD9wMgW49b5KjR7poTzG-UcYrKiipg/3JafunFFIEI.jpg",
        "https://sun1-16.userapi.com/TVnam72mt-ckFoBDWDvLybM_iGZalUw4GVcIzA/3ZbARNXhr_A.jpg",
        "https://sun1-19.userapi.com/oYqJ6ojRGXpmk3cGn4zQdtEHRDH1A6osfNhpaQ/xqVslxeC6PI.jpg",
        "https://sun1-30.userapi.com/Wm571lwlCA1k02sPKRnAakeS0fbhGw8gkIUwGQ/7S9uuMVs_JA.jpg",
        "https://sun1-95.userapi.com/g19KE6aBMX8aDPymprJfP_XM3rnALjO1FzEGyg/WWbI3Jyt-hY.jpg",
        "https://sun1-98.userapi.com/KoU0YMb7phsC6xLZbQ38PVH5dssbU_3dfdG63Q/UUzUtA0mnXk.jpg",
        "https://sun1-54.userapi.com/ZtzV-sBhzQ_SCKCAdH5ssgHSOjE_Vep-8yjeQQ/kHUfHji7EoM.jpg",
        "https://sun1-24.userapi.com/c6D9fArxX7L_H9hDETJz3qG7xlad89c4v4BJUw/3YKtcr2dw8M.jpg",
        "https://sun1-30.userapi.com/SlpVeEIb5mhbnMJWoOy_wDXYyxjs4k0heMU0wg/Zl6bBKuEh90.jpg",
        "https://sun1-92.userapi.com/tAzdyd-N7DYCgnmvB65IoXWPT6mmUAsrYvt75w/xzbWRdO1AE4.jpg",
        "https://sun1-16.userapi.com/FQYaUs0N1_ULo4f_zSn0wJdSQwO1n9nyhPKBfg/O4h6JMXEfMg.jpg",
        "https://sun1-21.userapi.com/VP8dGlw5YxLB4-LHgUaizmyxYlHKf1PMifEJyg/dU5l9BXyEOc.jpg",
        "https://sun1-26.userapi.com/AoCcaeQ3FBsbgZTDX9pFnkORrudRD1im0Tc5dg/pU5L0LTAWVk.jpg",
        "https://sun1-86.userapi.com/XZWjZT_EKfcrj5JUJ-Z_KVd53iPC8s9uw52gXg/9TJZijGTOo4.jpg",
        "https://sun1-84.userapi.com/30S5lDgAc8_-ujKKIZLIcKeuptQHgW-J4G8qmw/3RpWyGZJweE.jpg",
        "https://sun1-98.userapi.com/dcFP8xlMRjavBKjvp27P1grpZaGH0c-ugsQLQw/d-SAjr41Ch0.jpg",
        "https://sun1-92.userapi.com/B2VtXeGKr26XPPxyyzJoZAwGAq_HfqtR4-6N3Q/DZTZr_RPgaw.jpg",
        "https://sun1-22.userapi.com/5gr4YbIeu8r2uNBdm1Oi-iTYqN-khe02588XjQ/I3ot5rue7eo.jpg",
        "https://sun1-56.userapi.com/iPMEnz4l3cUvfC7YGrzkAjKV4aKfehbRoDpWDA/IxOPmtMiCGg.jpg",
        "https://sun1-83.userapi.com/kkP7Md0rHfpsTy1Ex7Y7FLrsturiJjWq1H7zAA/ylqGxeTItes.jpg",
        "https://sun1-22.userapi.com/BFJoA8DzWkpRdMXfHP1D4FftTiAIVLVKmRp6Dw/uLBsr4KA6BU.jpg",
        "https://sun1-19.userapi.com/-WpB4n1f9CfkVDg1_cVnb5bavzcs-Md_gN5Eaw/qwwNq72gyxI.jpg",
        "https://sun1-14.userapi.com/d9to5zk0qZ2-hW47g6WDgmNmYTFm6HzR_ivEZA/yn-Ij1Z9cOg.jpg",
        "https://sun1-83.userapi.com/-8tgG4LHM6NkP72NCEE6yGHvObGythO4xQfGFg/udeAPKYAfsc.jpg",
        "https://sun1-23.userapi.com/gYq7oM4RdQYoP418kXzh5eW_kunSjfptYN_Z7Q/c8z61G6sSsk.jpg",
      ],
      [
        [
          {
            url: "https://sun1-91.userapi.com/woA5VM2RfR5Pau-FnO9BtbtcneNqPTXieqjJgQ/LCAXYbwIc7g.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-88.userapi.com/xp5336pjhAEwGcUzXddz6Kic0xXkeSnqfW56mg/PdLOTw8qurA.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-96.userapi.com/89dJ9pQgQq9NmDO4CnXWCYu-QXxWo2ARriSKqw/ddGbDYJ0img.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-14.userapi.com/0VSK9wRPDNRjSIULCI55Lo-C_S5865qtpHqQPw/tY79IM8NC_g.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-56.userapi.com/N3EPEvJRQj17DX5VGzzAH7VQzJJAXnalZ36dsA/pIZ3VUmsoPU.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-93.userapi.com/uWkjDaFP8ZDZoW_Hkn47r-ZfY0kGrjYuu28_Kw/MGuv8i5inAw.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-15.userapi.com/5uaaMkNMerK7Wxk6EasBZZc0UGk7H0tegGrXLw/G9WiK5VQ-NQ.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-97.userapi.com/JhmO9Vw5LX0RuT6wtlCLmkObmABZPFTEghsxHg/ywcyW1CIUWE.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-17.userapi.com/n0F9MWzl-SnWjd_k3sU8ChZOwV3p8vlDCQNUaQ/D2jDd1d-nGQ.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-20.userapi.com/oa7I1n2AAoRx7fHJ_nyaIipMV90ZsJJJJjToeQ/DD0cuoTyzw0.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-18.userapi.com/gnzTjFT089pRzjnqav1D0aQKA3O7eZlgMfo-Ig/9JrhKDCs0QI.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-47.userapi.com/ffYkm5lhsIPZU-BOocCzWyTrUR5WQ3SqHAjfxw/CPjn7oYNTvQ.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-57.userapi.com/bU1XzBQ8KIiQu109goBcHJelU-ErM0vL1FWeEg/Syj9hh7doqk.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-84.userapi.com/OdxIT1qwM6wE2TlLK5AE-BaHWHBE-vkomwyI5w/-Ci8mY-oQWE.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-14.userapi.com/voUcqfF_iAgjGjezo9j2PlGU32vr9IKVrsvETg/zhogRKtFpW0.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-84.userapi.com/AEyxLTHsqoCTYUddJi58mmIeIHvgSjWggepGVA/sCuk3X24uFY.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-87.userapi.com/fDf8Ec1JPA1h_fIEef1oYWhY0wuZmGslX9wiog/FlCEBIoDY6s.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-21.userapi.com/R-osso4QQ1Isp2qif7DkjBbtjif9lR0QWhHNFg/q7NX17Ahs74.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-18.userapi.com/CCMH_cc17zmIXMsxHNLpGQtsLlYGVOtE5fNHOA/GhqUT6fk2pA.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-87.userapi.com/7xekPEaieQrXVhQurJSPR8pi-az3GHEhsVQQxQ/k9vhehRaCSU.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-23.userapi.com/pWGNtjJN3ECmweJ_FE3fIhjZdK2EWEKwSSbGHw/xkOnEPHvUDE.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-24.userapi.com/11rB9WbViCCeXcEJU4LJr8mvdNEBYnXkKBRx8w/nGqwotduWRE.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-96.userapi.com/Bth40jDhuJ3C_nAhkuNIWab-BeP-2Rw8rqyyyA/RQimSpM0SG0.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-29.userapi.com/KfuEgQTLGuQuwwzhaZhuSWfUuCbuUxdiVLpCXw/3UUI84QQi0c.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-88.userapi.com/dmTKneAAlUzH5HKlXZZe_J1OTQafJl_BFUpRTQ/fR8k5x10YTA.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-93.userapi.com/rFZXzkjCLPGXk66qZo3oyp-FmBaoL9QO_eqY1Q/6g4V2hH1Q_E.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-88.userapi.com/NAoSWfltLIfHwh_6IWgCxjGDS3-y3MRYqrv1NA/asOmaZ8RFyQ.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-85.userapi.com/4a_fHSxqsotVCHsYNuFHav-mQN4QQcb3_fvxFA/dxQyFZm1QtE.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-26.userapi.com/1aklO117bSD5-wKAkd8TQF77bXi2TegHOQMizQ/aU9WY8LgU5Q.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-90.userapi.com/igAilh_V0JnZvgGpPkOtHe44K_geHZgmi33kPA/uSMJbgqZKPw.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-87.userapi.com/8DhG_4ry9v1TUN19SSdOeCOUZiUhWg1HBJyNnw/k4HhIbwPreI.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-21.userapi.com/YYSHBFHWMLN6HPuUIetksTfPEyTyJta74BBlMQ/k-G-nRKUZ64.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-91.userapi.com/VKYbZIGaU9zz_gY7lyzyd0Y-Gg7tX3j644pzgg/mH7tLKPws-M.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-92.userapi.com/s6CYV-GFkZ8G0Lzh0B_upkSR1xB5xa92rVUOuQ/0I2W7YiLeVc.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-89.userapi.com/Vg2OOAECQli5822lkBuAIsJ_z3CQO3nsjxV5Wg/bryvfFc_B5I.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-55.userapi.com/vKUdT8Kbck8TV044zPryyBiCE6wC5fv9-IkJqQ/1lZdajaiNWw.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-30.userapi.com/7Yfd6E9B7M7x7ss2wU9QZBnWuuWACEjzw5-FlQ/6cABYsdRwMQ.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-20.userapi.com/gs3hjPXYp35CpS0FC9I-WOm1WgVxCml-crdEyg/Zmp8lg2mOsg.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-16.userapi.com/Zkm5OfFV5uVSGPrYaAZ09xRBRz-8F4wV1RB7MQ/T1REuaAHi80.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-28.userapi.com/zi3e3NcJD3yhMCjtXIURNu13RP-K5LFMnBc9TQ/EkWWWTcX6Q8.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-57.userapi.com/KNOSpDlntdeTwk2FtjRYdN_oxr1K7qyCj3MKRA/fNGjltuDpG4.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-14.userapi.com/A6EwBHChKbUqCPUY7FO5-5KcZoupgUnV9FDEWQ/VkTKSVXxqEQ.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-89.userapi.com/c4JSWzKojdT4nr7X3y81_8x1YX8YES5_bXOCHA/CS4Y6FVV66E.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-23.userapi.com/j0h7tgYTw5mG7XmY7jYStYAlClnLrVal5VQdWw/5xpo7_aJKWs.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-94.userapi.com/43Wzx5BTREqtZ-qk8ka4NYhQzUSbS7OvFWs7hw/ilIQVaz9-dc.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-84.userapi.com/dD7MuMm26wZWsycpln0yt_ZggTxSOsaDBAbeSA/tVYtZq7hXyI.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-24.userapi.com/hnx9991YfWpsCt--QzbeB2gXMX7OVLsGtk96vA/3CmoykXOsFA.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-27.userapi.com/CD1v2kQsNY5MpUXSUcOBOW5jjeqft-dxsi-UCw/AfgvEJBdyvQ.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-85.userapi.com/ZFsfh8HxiCqZu2Wjb1ZgVxZgFMoYCf_FsUe6Yw/p5RAGMuUyrU.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-16.userapi.com/BWsBYPFD69KCIsrGnP-C6EYwRtoaN_daQQLIzg/_USIc_sJLUc.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-87.userapi.com/tmCbtct9jt6rqNDYoqlTlLnTaxS8NQyiHrHHIQ/WuFcf7-_gUc.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-27.userapi.com/-lHdxMGWMuCYCP45WwYhJPJfvcl7CH04QfUcVQ/8P3p0Q_nvUs.png",
            width: 96,
            height: 96,
          },
        ],
      ],
    ],
    emoji: [
      getCategoriesLang(lang)[1] || "Эмоции",
      [30, 35, 26, 29, 36, 21, 25, 24, 27, 22, 23, 28],
      ["000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"],
      [
        "https://sun1-85.userapi.com/KFSMBYmw8Ti7SXOH_o0pZujnGU-pDpFlfZXmMg/H8lQeavpe00.jpg",
        "https://sun1-96.userapi.com/N6cRL2s7aCHfyG3bf9iAejgijpnwT_4aVn8X1w/2EJ0kdgF4Kg.jpg",
        "https://sun1-87.userapi.com/Wag9Dor_FjnIpH3I958OEPPRyFizWOyKoyrx2w/M5skr1WR9kg.jpg",
        "https://sun1-85.userapi.com/qp1EnN92rtZ2y4vj0FhUJb5NffemfFJPKo-H2g/X098I_FKzxY.jpg",
        "https://sun1-15.userapi.com/2ej1j92VkvaytY8y1Ho0ByMD706CnzNk97oo4w/ln8pXbC0yfA.jpg",
        "https://sun1-30.userapi.com/oQwFUyBuS0gDqGtO9UayuHyjLV-v1QHZdYryMQ/PkpdeMrEJFQ.jpg",
        "https://sun1-15.userapi.com/67FmkyyO7UnnHGVjCp5R0d9QytBw5dnF2MY0Hg/rK-QnzUCiEI.jpg",
        "https://sun1-95.userapi.com/994BmjOwJ4YtE2jQChdr_RwsYBfRJYKr7CD8-w/CpCM7vqPKtk.jpg",
        "https://sun1-24.userapi.com/7X_sEkP3F7FvgEoj9IhUmnedBR3GRHyk0GOIzA/1D_Wk0d0oZk.jpg",
        "https://sun1-88.userapi.com/KW5oY9OEHrKhUufK4rhiGY8N5FkJisTzQglpVw/aZ14SC3HjHQ.jpg",
        "https://sun1-91.userapi.com/vb0qZ6-Hl750bYhWljLzsqtpn__qd6YPeP4rYw/XPHPWBlQTSk.jpg",
        "https://sun1-86.userapi.com/PIuHQjeQEud6BNa1ybi1t77ChyyPlCO7uU6cOg/nyalFhZ0_YM.jpg",
      ],
      [
        [
          {
            url: "https://sun1-97.userapi.com/2Jnig_9grs_YDnAtVKrlMq7kxlPuSdKBGtf-Pw/D47ShpKm3JE.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-56.userapi.com/SvSnCJiWG7XRZexCg2ttBENjQgqa5qF2dokm9Q/AhEoXGOg9c8.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-86.userapi.com/qFmDspqDXvNWaeLchZgz8c8-XpHXF70CUYPBKQ/ID3a5HH0600.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-26.userapi.com/I6_LRf_V6bLJ81nxyR92cu2bW6vnRGURlrAUjQ/P_4swggAfCs.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-17.userapi.com/tF-jTgMiDgHUrO8eBlL7Zsml0nzhOlALGCG6tw/rnSRAqZbCrk.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-96.userapi.com/haAKW37M-mqRQVn9S8X3zCZvAJWyz_FxfJXp6g/0J4fZ9UwJ8w.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-87.userapi.com/KYHNb3_bbiNUOljmvQfR7H0TFxgdCB831HHdEw/sJa7Z1xU0XI.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-54.userapi.com/JIr6zjQGzxxqDy-OrNjNjtFuurpgRTq8_oiEPA/UAYQSitSL5E.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-89.userapi.com/5Cd41xGH-YusLuuw9U5BmLntn448geah7kn4lA/u2pvXxtmbbY.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-83.userapi.com/Dix02Eqz1wTm2QfBcBQILgySwwr1EUA9y2ssTw/sVoecb_CqgQ.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-91.userapi.com/BTpWkxVOcItRglTI5yADs_MSGgoLOKvlVT7iOg/xTnX49Tja1g.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-91.userapi.com/Ek52YBT2HEW6OsRmmBGyNQesGUiB7zkfUw5fOA/lIq1biTTxdQ.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-96.userapi.com/FNwghrluSXyxR96tQMWJFxGH-UgYyXOOsiM9kA/k5Sq3xaDjb4.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-47.userapi.com/zw-FEk0uzJOQu-XCB7Befvy_oGFSxYbRFVRvjw/AU2Q9AFdmWg.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-91.userapi.com/M936z5mKWAg0DoHj9tOMe8_MfNFqyMLC9QiAWA/HNPzuiv2dvQ.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-14.userapi.com/T1ljuSKoL33BBxjSN3WPe8MmTSUaKyY-Sc4q4A/fH-EbUf417w.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-18.userapi.com/f-B7ibPs7BiXy0fdahvZTdwF5UQDmugkgTllKQ/VZ8ovME59v0.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-21.userapi.com/3DX-JHp8t_DiFRCsW9LRfrSpUGQgfNf2tQMVjQ/zoXja7h5I8E.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-55.userapi.com/bmQyxm38YrXqNoatFxYp6nFmQsizTtb70ctQlw/Cnr94sOSYK4.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-94.userapi.com/XaSqk6su_ldUzg2V6hnIUw435m8cXEiKl917fQ/61R4jO9E1Fs.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-47.userapi.com/uptDGEiQeOJaRFAsJ5PKVj43F_Gb6OnfgNfJhg/VwNOe9V88ws.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-28.userapi.com/9eK9Ev--ZtztO7iHrM8qEl5bQhPI1xRJRUArrg/NcJHVWSnI0g.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-56.userapi.com/bp__As76aFTLt0eMSjK7RqVZ892tzljWXJP09w/YJKkDui5bes.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-26.userapi.com/P0c6XZgdVOHfrVNM5EPRUHfBwpYDFgSryNYNzw/xlIHrsd5Xa8.png",
            width: 96,
            height: 96,
          },
        ],
      ],
    ],
    gradient: [
      getCategoriesLang(lang)[2] || "Градиенты",
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ["26203E", "FFFFFF", "FFFFFF", "133C5C", "FFFFFF", "FFFFFF", "481B49", "FFFFFF", "5B260D", "FFFFFF"],
      [
        "https://sun1-94.userapi.com/X3ivWlf00Szk5rTaa6rPx56ILtLi6KuWFynWIQ/cn9emLQqqjU.jpg",
        "https://sun1-25.userapi.com/OPWRPKj8aREB7Nv2G-X76HyAn_cBt2I4aK125Q/vZhCfwmsjdM.jpg",
        "https://sun1-85.userapi.com/lrn0TNt49Zq2Ix25kghDYXRLIEmUtP49PAlFPA/TtnyGvxCnjo.jpg",
        "https://sun1-94.userapi.com/ri9A-chLRv_qo3TY2PT5V02giyW3QqWRyeM84w/5c_F6KTCQfY.jpg",
        "https://sun1-18.userapi.com/oeNoLxRCLaRWWdY8ypTDpSLF8cbPr_ZPuZrrkg/gyuPqkXDdE4.jpg",
        "https://sun1-89.userapi.com/qif0lP5kdN3XlmBP_xWJLkrPQSIGhZ294imZ6Q/c9_ZzWRXBbA.jpg",
        "https://sun1-28.userapi.com/BH9aSUf5SJr1Ns1eiifiM2V_3FZ_4knMpPZ61w/LwXrxTsQEFM.jpg",
        "https://sun1-21.userapi.com/FiKo6JyRIWfvzenjUAanQNsY8ZzJhRGBN3tqaA/GqM90JV5120.jpg",
        "https://sun1-25.userapi.com/moQM0WVqWPq3MW_Vt7b-w-TEpI2Dk2nFGozX6g/fK6-aAFXXVg.jpg",
        "https://sun1-89.userapi.com/6N5l7yUQLAt3sWJYVBeF8Fi4f9fznnBVtF6Ffg/hef_wSq8c5U.jpg",
      ],
      [
        [
          {
            url: "https://sun1-13.userapi.com/vSh5NbrxCWLKiTdhY3wU8w_j6-CMdrkNt9Kivg/j5avByYch0Q.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-97.userapi.com/xUNSQhNjJmrXg5-lwZmwZddQu3iotukEL7Mjyg/-WKSOxcuLgA.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-54.userapi.com/R3lTyZWoCMdYZk9C6yt11xAsLsl4jcyc9jOAVg/6WBJU7jYemE.jpg",
            width: 1440,
            height: 1080,
          },
          {
            url: "https://sun1-25.userapi.com/OPWRPKj8aREB7Nv2G-X76HyAn_cBt2I4aK125Q/vZhCfwmsjdM.jpg",
            width: 720,
            height: 540,
          },
          {
            url: "https://sun1-23.userapi.com/zDeWlv9YyvtYRGWwOWoj-BQCDjbMqmOuXX4c-w/2jP39G7jlVI.jpg",
            width: 360,
            height: 270,
          },
        ],
        [
          {
            url: "https://sun1-96.userapi.com/bV_0vMUMqHvgEvtNacIG88nKBpsNxhTsb_L01Q/iPq3WJdv_to.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-89.userapi.com/and6SBfYAToupc-ZF8D9y6nCAXUV63jV3nkBzw/5EcyhdFDYts.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-54.userapi.com/EKW6pvhOT73ojT_g-svUm4YnuwSF8XW94cZA5Q/0l5R4ct4l0g.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-14.userapi.com/T-t909yKwoXRWoHk1Cva0yG6FGrqeblgRkuH7g/ZDcEaQuecR4.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-54.userapi.com/JAbYxOg2lrH5ad5fyUF3CgFjm9MPDnMLeai5Tg/qEELep9o72k.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-88.userapi.com/xblPxCS58WrghCFSN5-_PUfxgwklBjjPbeP91g/B7NkL4r45to.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-87.userapi.com/Uq-k5GFY9qyI5O7OEoF3lWI0gRGF0b1bwwAxBQ/HY8WuXQaytc.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-17.userapi.com/cirN6DAKFh-zNLThmwogl-n0mjmBXRs1Udh4Yw/PPwgwhc-a8Q.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-21.userapi.com/tLp-504oHAcSE8S39ZczQpdpo5FNSv2e1-5tGg/eGdipOfU5eY.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-22.userapi.com/AR12AtYPzhhWftsWyRz9_idQEd41St44VB2YUg/DU0IfrXQbCk.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-56.userapi.com/oGbJnSDkkgDgpELCM7a9ktFRmavT0zRqpRTM1w/pXUZS90lE7s.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-16.userapi.com/9wlGOMPWwYrIErM7GYxEbVMugTNkbpmt8Mz2WA/jPJoET63xOw.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-24.userapi.com/rmnLGv18EUYaivRJUqQW8Q65CcdmE7pFchmA0g/0-SbpPtxbyI.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-86.userapi.com/5HYjNVONJZLp4aviX1oL4p4bwkCPNWvkuV91-g/QVUP1z8guGs.png",
            width: 96,
            height: 96,
          },
        ],
        [
          {
            url: "https://sun1-19.userapi.com/XgCvgBqersxttCJLcmvz9H4XVG4OqkNFxVsoCA/4o8vnLbpEug.png",
            width: 48,
            height: 48,
          },
          {
            url: "https://sun1-22.userapi.com/LSCWj1Kh0F354hXbXIujN_M-TJsGaGVSu4s3fQ/x7d9bZvbR7Y.png",
            width: 96,
            height: 96,
          },
        ],
      ],
    ],
  };

  Object.keys(nameIds).forEach((nameId) => {
    let categoryId = nameId;
    let categoryName = nameIds[categoryId][0];
    let categoryBkgIds = nameIds[categoryId][1];

    let bkgsObj: any[] = [];
    let i = 0;
    categoryBkgIds.forEach((bkgId) => {
      let bkgObj = {
        id: `0_${bkgId}`,
        author_name: authorName,
        author_link: authorLink,
        background_name: `${nameId}_${bkgId}`,
        main_color: "fff",
        text_color: nameIds[categoryId][2][i],
        preview: nameIds[categoryId][4][i][0].url,
        preview_2x: nameIds[categoryId][4][i][1].url,
        urls: {
          main: [
            {
              width: 369,
              height: 277,
              url: nameIds[categoryId][3][i],
            },
          ],
        },
      };
      bkgsObj.push(bkgObj);
      i++;
    });

    let caregoryObj = {
      bkgs: shuffle(bkgsObj),
      id: categoryId,
      name: categoryName,
    };

    categoriesObj.push(caregoryObj);
  });

  return categoriesObj;
};

export default getCategories;
