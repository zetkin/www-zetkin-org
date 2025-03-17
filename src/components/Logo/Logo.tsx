import React from 'react';
import { motion, useTransform, MotionValue } from 'motion/react';
interface Props {
  className?: string;
  scrollY: MotionValue<number>;
  forceFull?: boolean;
}

export const Logo = (props: Props) => {
  const { className, scrollY, forceFull } = props;

  const opacity = useTransform(scrollY, [120, 180], [1, 0]);
  const maxHeight = useTransform(scrollY, [120, 200], [200, 0]);

  return (
    <div
      className={
        'flex flex-col items-center gap-[3.27px] sm:gap-[2.21px] ' + className
      }
    >
      <svg
        className="w-10 sm:w-[27px]"
        fill="none"
        viewBox="0 0 41 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M36.6992 23.303C36.5745 23.2782 36.4248 23.303 36.3001 23.303C35.0281 23.3777 33.7561 23.2035 32.5091 22.7804C31.9604 22.5813 31.4117 22.3573 30.9128 22.0587C30.4639 21.7849 30.0399 21.4862 29.6658 21.088C29.3665 20.7894 29.1171 20.4658 28.9425 20.0925C28.8178 19.8436 28.743 19.6196 28.6931 19.3459C28.5933 18.7486 28.6931 18.2259 28.9674 17.7282C29.1919 17.33 29.5161 17.0313 29.8653 16.7824C30.2394 16.5087 30.6634 16.3345 31.0874 16.1851C31.4865 16.0607 31.8855 15.9611 32.2846 15.9114C33.0328 15.8118 33.806 15.8118 34.5542 15.8865C35.5519 16.0109 36.5246 16.2598 37.4474 16.7078C38.0211 16.9815 38.5947 17.33 39.0935 17.7531C39.4427 18.0517 39.742 18.3753 39.9914 18.7486C40.0662 18.873 40.1411 19.0223 40.2159 19.1468C40.2658 19.2712 40.3156 19.3708 40.3406 19.5201C40.3406 19.545 40.3655 19.5948 40.3905 19.6196C40.4154 19.8436 40.4653 20.0676 40.4902 20.2667C40.4902 20.2916 40.4653 20.3165 40.4653 20.3663C40.4902 20.4907 40.4653 20.64 40.4403 20.7645C40.3905 20.9885 40.3156 21.1876 40.2159 21.3867C40.0662 21.6604 39.8667 21.9093 39.6173 22.1084C39.2681 22.4071 38.894 22.6311 38.4949 22.8053C38.1957 22.9297 37.8964 23.0293 37.5971 23.1039C37.5472 23.1288 37.4973 23.1537 37.4474 23.1786C37.2229 23.2284 36.9735 23.2533 36.6992 23.303Z"
          fill="black"
        />
        <path
          d="M18.6666 18.7486C17.6191 18.7486 16.6464 18.5992 15.7236 18.2259C15.3245 18.0766 14.9504 17.8775 14.6262 17.6286C14.3518 17.4295 14.1024 17.1806 13.9029 16.882C13.7283 16.6331 13.6285 16.3345 13.6036 16.0358C13.5787 15.7123 13.6535 15.3887 13.8031 15.0901C13.9528 14.7665 14.2022 14.4928 14.4765 14.2439C14.8756 13.8706 15.3495 13.6217 15.8483 13.4226C16.422 13.1986 17.0205 13.0493 17.6191 12.9497C18.2676 12.8502 18.941 12.8253 19.5895 12.875C20.4874 12.9497 21.3603 13.1488 22.1833 13.5719C22.6073 13.7959 22.9815 14.0448 23.2808 14.3932C23.3805 14.5176 23.4803 14.667 23.5801 14.7914C23.8793 15.3389 23.9043 15.9114 23.6549 16.4838C23.5052 16.8073 23.2808 17.106 23.0313 17.33C22.6073 17.7282 22.1335 18.0019 21.5848 18.201C21.061 18.425 20.4874 18.5495 19.9386 18.649C19.4897 18.7237 19.0408 18.7486 18.6666 18.7486Z"
          fill="black"
        />
        <path
          d="M3.55217 15.6873C3.07829 15.6873 2.57947 15.6376 2.0557 15.5131C1.78135 15.4385 1.507 15.3389 1.25759 15.2145C1.10794 15.1398 0.958295 15.0403 0.858531 14.9158C0.683943 14.7416 0.559235 14.5425 0.509353 14.2687C0.484412 14.0945 0.509354 13.8954 0.584177 13.7461C0.659 13.5221 0.808647 13.3479 0.958294 13.1737C1.20771 12.8999 1.48206 12.6759 1.80629 12.4768C2.42982 12.0786 3.07829 11.8048 3.77664 11.5808C4.47499 11.3817 5.17334 11.2324 5.87169 11.1826C6.39546 11.1329 6.91922 11.1329 7.41804 11.2075C7.86698 11.2573 8.29098 11.3569 8.69004 11.5311C8.91451 11.6306 9.0891 11.7551 9.26369 11.9293C9.53804 12.2279 9.6378 12.5764 9.5131 12.9746C9.46322 13.1239 9.38839 13.2483 9.31357 13.3977C9.11404 13.6714 8.88957 13.9203 8.61522 14.1194C8.16628 14.4678 7.6924 14.7167 7.19357 14.9407C6.4204 15.2642 5.62228 15.4633 4.79923 15.5878C4.40017 15.6376 4.00111 15.6873 3.55217 15.6873Z"
          fill="black"
        />
        <path
          d="M16.8957 9.341C16.1724 9.341 15.5489 9.26633 14.9254 9.09212C14.7009 9.01745 14.4764 8.94279 14.252 8.81835C14.1023 8.74369 13.9776 8.64414 13.8529 8.5197C13.6035 8.27082 13.5786 7.97216 13.803 7.67351C13.8779 7.54907 14.0026 7.44952 14.1023 7.37486C14.3268 7.20064 14.6012 7.0762 14.8506 6.97665C15.2496 6.80244 15.6986 6.70289 16.1226 6.62822C16.6713 6.52867 17.22 6.50378 17.7936 6.50378C18.3423 6.52867 18.891 6.57845 19.4148 6.72777C19.6642 6.80244 19.9386 6.90199 20.163 7.05132C20.2877 7.12598 20.4124 7.22553 20.5122 7.34997C20.6868 7.59885 20.7117 7.84773 20.5371 8.0966C20.4374 8.24593 20.3127 8.34548 20.188 8.46992C19.9884 8.61925 19.739 8.74369 19.5146 8.84324C19.1155 8.99257 18.6915 9.11701 18.2675 9.19167C17.7936 9.29122 17.2948 9.341 16.8957 9.341Z"
          fill="black"
        />
        <path
          d="M27.9446 4.71181C27.2712 4.68692 26.5977 4.61226 25.9493 4.33849C25.6999 4.23894 25.4505 4.1145 25.201 3.9154C25.1013 3.81585 25.0015 3.7163 24.9267 3.59186C24.777 3.34298 24.777 3.0941 24.9267 2.87011C25.0265 2.6959 25.1512 2.57146 25.3008 2.49679C25.5752 2.32258 25.8495 2.19814 26.1488 2.12348C26.8222 1.94926 27.4956 1.89949 28.194 1.97415C28.6928 2.02393 29.1916 2.12348 29.6904 2.34747C29.9149 2.44702 30.1144 2.57146 30.314 2.77056C30.3888 2.84522 30.4636 2.94477 30.5384 3.04433C30.6881 3.2932 30.6881 3.56697 30.5384 3.79096C30.4636 3.9154 30.3638 4.01495 30.2641 4.08961C30.0396 4.28872 29.7902 4.38827 29.5408 4.46293C28.9921 4.63715 28.4683 4.68692 27.9446 4.71181Z"
          fill="black"
        />
        <path
          d="M18.3422 3.41767C17.8185 3.39278 17.3945 3.36789 16.9954 3.16879C16.8707 3.09413 16.7211 3.01946 16.5964 2.91991C16.5215 2.87014 16.4716 2.79547 16.3968 2.69592C16.2472 2.47193 16.2472 2.22305 16.3719 1.99906C16.4467 1.87462 16.5215 1.75018 16.6213 1.67552C16.7709 1.55108 16.9455 1.42664 17.0952 1.32709C17.4194 1.12799 17.7686 1.05333 18.1178 0.978662C18.4669 0.903999 18.8161 0.903998 19.1653 0.928886C19.4895 0.953774 19.8138 1.02844 20.138 1.20265C20.2627 1.27732 20.3874 1.37687 20.5121 1.47642C20.5869 1.52619 20.6368 1.65063 20.6867 1.75018C20.7366 1.89951 20.7366 2.04884 20.6867 2.19817C20.6368 2.34749 20.562 2.44704 20.5121 2.52171C20.3874 2.67103 20.2627 2.79547 20.113 2.87014C19.8137 3.06924 19.4895 3.19368 19.1902 3.24345C18.8411 3.343 18.5418 3.36789 18.3422 3.41767Z"
          fill="black"
        />
        <path
          d="M9.53809 2.44705C9.26374 2.39727 8.96445 2.32261 8.71504 2.14839C8.61527 2.09862 8.51551 1.99907 8.44068 1.89952C8.29104 1.67552 8.31598 1.40176 8.51551 1.15288C8.61527 1.05333 8.69009 0.978666 8.78986 0.904003C9.06421 0.7049 9.33857 0.605349 9.58798 0.530685C10.2115 0.356471 10.8101 0.356471 11.4087 0.530685C11.6082 0.580461 11.7828 0.655125 11.9574 0.829339C12.0073 0.879115 12.0821 0.953778 12.132 1.05333C12.2068 1.20266 12.1819 1.40176 12.0821 1.57597C12.0073 1.70041 11.9324 1.77508 11.8576 1.84974C11.6332 2.04884 11.4336 2.14839 11.2092 2.22306C10.86 2.3475 10.5108 2.42216 10.1866 2.42216C9.96209 2.44705 9.76256 2.44705 9.53809 2.44705Z"
          fill="black"
        />
      </svg>
      <motion.div
        className="flex flex-col items-center gap-[2.24px] sm:gap-[1.51px] overflow-hidden origin-top"
        style={{
          opacity: forceFull ? 1 : opacity,
          maxHeight: forceFull ? 200 : maxHeight,
        }}
      >
        <svg
          className="w-[66px] sm:w-[44px]"
          fill="none"
          viewBox="0 0 66 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.1585 8.77634C23.8841 8.02971 23.4601 7.38262 22.9363 6.8102C22.4126 6.23778 21.7641 5.7898 21.0159 5.46626C20.2676 5.14272 19.3698 4.96851 18.3721 4.96851C17.1749 4.96851 16.1025 5.26716 15.1547 5.83958C14.182 6.412 13.4338 7.20841 12.8851 8.17903C12.3364 9.17455 12.062 10.2945 12.062 11.5887C12.062 12.8082 12.3364 13.953 12.8851 14.9485C13.4338 15.9689 14.2069 16.7653 15.1797 17.3626C16.1524 17.9599 17.2996 18.2586 18.6215 18.2586C19.4945 18.2586 20.2926 18.1342 21.0159 17.8604C21.7392 17.5866 22.3627 17.2382 22.9114 16.7653C23.4601 16.2925 23.8342 15.7698 24.0836 15.1476L21.6145 13.9281C21.3401 14.4259 20.9411 14.8241 20.4672 15.1227C19.9933 15.4214 19.3698 15.5707 18.6714 15.5707C17.9731 15.5707 17.3495 15.3965 16.8008 15.073C16.2521 14.7494 15.8531 14.2765 15.5787 13.6792C15.4041 13.3059 15.3044 12.9077 15.2794 12.4846H24.4578C24.5076 12.3104 24.5575 12.1113 24.5825 11.8873C24.6074 11.6633 24.6074 11.4144 24.6074 11.2153C24.5825 10.3194 24.4328 9.52298 24.1585 8.77634ZM16.6761 7.95504C17.1749 7.6315 17.7486 7.48217 18.3971 7.48217C19.0705 7.48217 19.6441 7.65639 20.118 7.97993C20.5919 8.30347 20.9411 8.75145 21.1406 9.32387C21.2403 9.57275 21.2902 9.84652 21.3152 10.1452H15.3293C15.3792 9.87141 15.454 9.62253 15.5538 9.39854C15.8032 8.75145 16.1773 8.27859 16.6761 7.95504Z"
            fill="black"
          />
          <path
            d="M32.0151 18.0844C30.5685 18.0844 29.4711 17.6862 28.673 16.9147C27.8748 16.1431 27.5007 15.0232 27.5007 13.5797V7.97993H25.3059V5.24227H25.5304C26.1539 5.24227 26.6278 5.06806 26.977 4.74451C27.3261 4.42097 27.5007 3.9481 27.5007 3.32591V2.35529H30.5435V5.24227H33.4617V7.97993H30.5435V13.4304C30.5435 13.8535 30.6184 14.2019 30.768 14.5005C30.9177 14.7992 31.1421 15.0232 31.4664 15.1725C31.7906 15.3218 32.1897 15.3965 32.6885 15.3965C32.7882 15.3965 32.9379 15.3965 33.0626 15.3716C33.2122 15.3467 33.3619 15.3467 33.4866 15.3218V17.9351C33.2621 17.9599 33.0127 17.9848 32.7384 18.0346C32.4889 18.0595 32.2395 18.0844 32.0151 18.0844Z"
            fill="black"
          />
          <path
            d="M43.6628 17.9351H47.1795L42.3908 10.3443L47.1047 5.24228H43.2887L38.4501 10.2696V0.588257H35.3823V17.9351H38.4501V14.0775L40.0962 12.3104L43.6628 17.9351Z"
            fill="black"
          />
          <path
            d="M48.7754 17.9351V5.21741H51.8431V17.9351H48.7754Z"
            fill="black"
          />
          <path
            d="M64.7875 7.25818C64.3885 6.53644 63.8148 5.96402 63.0916 5.56581C62.3683 5.16761 61.5452 4.96851 60.5974 4.96851C59.6996 4.96851 58.9014 5.16761 58.228 5.56581C57.7043 5.86447 57.3052 6.28756 57.0059 6.8102V5.24227H54.1377V17.9599H57.2055V10.5185C57.2055 9.97096 57.3052 9.4732 57.5297 9.075C57.7542 8.67679 58.0534 8.35325 58.4525 8.12926C58.8516 7.90527 59.3005 7.78083 59.7993 7.78083C60.3231 7.78083 60.772 7.90527 61.1462 8.12926C61.5203 8.35325 61.8196 8.67679 62.044 9.075C62.2685 9.4732 62.3683 9.97096 62.3683 10.5185V17.9599H65.436V9.77186C65.4111 8.82612 65.2115 7.97993 64.7875 7.25818Z"
            fill="black"
          />
          <path
            d="M4.7294 15.1476L11.239 7.45731V4.89386H0.738823V7.70618H7.04893L0.389648 15.3965V17.9351H11.3139V15.1476H4.7294Z"
            fill="black"
          />
        </svg>
        <svg
          className="w-30 sm:w-20"
          fill="none"
          viewBox="0 0 119 17"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.2447 16.576V8.2137H0V5.47604H2.2447V5.05295C2.2447 4.08232 2.44423 3.26102 2.84329 2.58905C3.24235 1.91708 3.79105 1.39443 4.51434 1.04601C5.23764 0.697576 6.08563 0.498474 7.05834 0.498474C7.25787 0.498474 7.4574 0.498476 7.68187 0.523363C7.90634 0.548251 8.10587 0.57314 8.25551 0.598028V3.23613C8.10587 3.21125 7.95622 3.18636 7.83151 3.18636C7.70681 3.18636 7.5821 3.18636 7.48234 3.18636C6.78399 3.18636 6.26022 3.33569 5.88611 3.63434C5.51199 3.93299 5.3374 4.40586 5.3374 5.05295V5.47604H7.40751V8.2137H5.3374V16.576H2.2447Z"
            fill="black"
          />
          <path
            d="M15.0894 16.7751C13.8423 16.7751 12.695 16.4764 11.6724 15.904C10.6498 15.3316 9.85173 14.5352 9.2282 13.5397C8.60468 12.5442 8.33032 11.3993 8.33032 10.13C8.33032 8.86075 8.62962 7.71591 9.2282 6.7204C9.82679 5.72489 10.6498 4.92848 11.6475 4.35606C12.6701 3.78364 13.7924 3.48499 15.0644 3.48499C16.3115 3.48499 17.4338 3.78364 18.4564 4.35606C19.479 4.92848 20.2771 5.72489 20.8757 6.69551C21.4743 7.66614 21.7736 8.83586 21.7736 10.13C21.7736 11.3993 21.4743 12.5442 20.8508 13.5397C20.2522 14.5352 19.4291 15.3316 18.4065 15.904C17.4588 16.5013 16.3364 16.7751 15.0894 16.7751ZM15.0894 13.9876C15.7877 13.9876 16.3863 13.8134 16.9101 13.4899C17.4338 13.1663 17.8578 12.7184 18.1571 12.1211C18.4564 11.5237 18.6061 10.8767 18.6061 10.1549C18.6061 9.40828 18.4564 8.7612 18.1571 8.18878C17.8578 7.61636 17.4338 7.16838 16.9101 6.84484C16.3863 6.5213 15.7877 6.34708 15.0894 6.34708C14.391 6.34708 13.7675 6.5213 13.2437 6.84484C12.72 7.19327 12.296 7.64125 11.9967 8.18878C11.6974 8.7612 11.5477 9.40828 11.5477 10.1549C11.5477 10.8767 11.6974 11.5486 11.9967 12.1211C12.296 12.7184 12.72 13.1663 13.2437 13.4899C13.7924 13.8134 14.391 13.9876 15.0894 13.9876Z"
            fill="black"
          />
          <path
            d="M31.5753 3.78366V11.2251C31.5753 11.7726 31.4756 12.2704 31.2511 12.6686C31.0266 13.0668 30.7273 13.3904 30.3283 13.6144C29.9292 13.8383 29.4803 13.9628 28.9815 13.9628C28.4826 13.9628 28.0337 13.8383 27.6346 13.6144C27.2356 13.3904 26.9363 13.0668 26.7118 12.6686C26.5123 12.2704 26.3876 11.7975 26.3876 11.2749V3.75878H23.3198V11.5487C23.3198 12.594 23.5194 13.5148 23.8935 14.2863C24.2676 15.0578 24.8412 15.68 25.5645 16.1031C26.2878 16.5262 27.1358 16.7502 28.1335 16.7502C29.0313 16.7502 29.8295 16.5511 30.5029 16.1529C31.0017 15.8543 31.4007 15.4561 31.7 14.9334V16.4516H34.5932V3.73389L31.5753 3.78366Z"
            fill="black"
          />
          <path
            d="M47.4878 5.82447C47.0887 5.10273 46.5151 4.5303 45.7918 4.1321C45.0685 3.73389 44.2454 3.53479 43.2977 3.53479C42.3998 3.53479 41.6017 3.73389 40.9283 4.1321C40.4045 4.43075 40.0055 4.85385 39.7062 5.37649V3.80856H36.813V16.5013H39.8807V9.035C39.8807 8.48747 39.9805 7.98971 40.205 7.59151C40.4295 7.1933 40.7287 6.86976 41.1278 6.64577C41.5269 6.42178 41.9758 6.29734 42.4746 6.29734C42.9984 6.29734 43.4473 6.42178 43.8214 6.64577C44.1956 6.86976 44.4949 7.1933 44.7193 7.59151C44.9438 7.98971 45.0436 8.48747 45.0436 9.035V16.5013H48.1113V8.31325C48.1113 7.36752 47.8868 6.54622 47.4878 5.82447Z"
            fill="black"
          />
          <path
            d="M60.183 0.697571V5.07783C59.8089 4.67962 59.3849 4.33119 58.8612 4.08232C58.1129 3.709 57.24 3.50989 56.2673 3.50989C55.0701 3.50989 53.9727 3.80855 53 4.40585C52.0273 5.00316 51.2541 5.79957 50.7054 6.79509C50.1567 7.7906 49.8574 8.91055 49.8574 10.1549C49.8574 11.3744 50.1318 12.5193 50.7054 13.5148C51.2541 14.5352 52.0273 15.3316 53 15.904C53.9727 16.4764 55.0701 16.7751 56.2922 16.7751C57.215 16.7751 58.0631 16.6009 58.8362 16.2276C59.4348 15.9538 59.9336 15.5805 60.3327 15.1076V16.5013H63.2259V0.697571H60.183ZM59.7092 12.1211C59.4099 12.6935 58.9859 13.1415 58.4621 13.465C57.9383 13.7886 57.3148 13.9628 56.6165 13.9628C55.9181 13.9628 55.3195 13.7886 54.7708 13.465C54.2221 13.1415 53.7981 12.6935 53.4988 12.1211C53.1995 11.5487 53.0499 10.8767 53.0499 10.1301C53.0499 9.38342 53.1995 8.73633 53.4988 8.16392C53.7981 7.5915 54.2221 7.14352 54.7708 6.81997C55.3195 6.49643 55.943 6.32222 56.6165 6.32222C57.3148 6.32222 57.9383 6.49643 58.4621 6.81997C58.9859 7.14352 59.4099 7.5915 59.7092 8.1888C60.0085 8.78611 60.1581 9.43319 60.1581 10.1549C60.183 10.9016 60.0334 11.5487 59.7092 12.1211Z"
            fill="black"
          />
          <path
            d="M75.2223 5.67513C74.7734 5.00316 74.1498 4.45563 73.3517 4.08231C72.5536 3.70899 71.6308 3.50989 70.5832 3.50989C69.7352 3.50989 68.9371 3.65921 68.1889 3.93298C67.4407 4.20675 66.8171 4.60495 66.2934 5.07782C65.7696 5.55069 65.3705 6.148 65.1211 6.81997L67.6152 8.03947C67.8397 7.46705 68.2138 6.99418 68.7376 6.64575C69.2364 6.29732 69.835 6.12311 70.4835 6.12311C71.1818 6.12311 71.7555 6.29732 72.1795 6.67064C72.6035 7.04396 72.8279 7.49194 72.8279 8.03947V8.43768L69.0369 9.05987C68.0393 9.2092 67.2162 9.48296 66.5428 9.85628C65.8694 10.2296 65.3955 10.7025 65.0962 11.25C64.7969 11.7975 64.6223 12.4197 64.6223 13.1415C64.6223 13.8632 64.7969 14.5103 65.171 15.0578C65.5451 15.6054 66.044 16.0285 66.6924 16.3271C67.3409 16.6258 68.1141 16.7751 69.012 16.7751C69.7103 16.7751 70.3588 16.6755 70.9324 16.4764C71.5061 16.2773 72.0298 16.0036 72.4788 15.6303C72.6534 15.4809 72.8279 15.3067 73.0025 15.1325V16.4764H75.8957V8.01458C75.8708 7.14351 75.6712 6.3471 75.2223 5.67513ZM72.4039 12.8926C72.1296 13.3655 71.7555 13.7637 71.2567 14.0125C70.7578 14.2863 70.2091 14.4108 69.5607 14.4108C69.0618 14.4108 68.6378 14.2863 68.3136 14.0374C67.9644 13.7886 67.8148 13.4401 67.8148 12.9921C67.8148 12.5442 67.9644 12.1708 68.2637 11.8971C68.563 11.6233 69.012 11.4242 69.6105 11.2998L72.8279 10.7522V11.2749C72.8279 11.8971 72.6783 12.4197 72.4039 12.8926Z"
            fill="black"
          />
          <path
            d="M84.7751 13.9379C84.6254 13.9628 84.5007 13.9628 84.401 13.9628C83.9021 13.9628 83.5031 13.8881 83.1788 13.7388C82.8546 13.5895 82.6301 13.3655 82.4805 13.0668C82.3308 12.7682 82.256 12.4197 82.256 11.9966V6.54622H85.1741V3.80856H82.2311V0.92157H79.1633V1.8922C79.1633 2.51439 78.9887 2.98726 78.6396 3.3108C78.2904 3.63434 77.8165 3.80856 77.193 3.80856H76.9685V6.54622H79.1633V12.146C79.1633 13.5895 79.5624 14.6845 80.3356 15.4809C81.1087 16.2773 82.2311 16.6507 83.6777 16.6507C83.9021 16.6507 84.1765 16.6258 84.4508 16.6009C84.7252 16.576 84.9746 16.5511 85.1991 16.5013V13.8881C85.0494 13.8881 84.9247 13.913 84.7751 13.9379Z"
            fill="black"
          />
          <path
            d="M90.4613 5.67517H87.3936V16.5014H90.4613V5.67517Z"
            fill="black"
          />
          <path
            d="M90.4613 0.971375H87.3936V4.23167H90.4613V0.971375Z"
            fill="black"
          />
          <path
            d="M104.578 6.72041C103.98 5.7249 103.181 4.95338 102.159 4.38096C101.136 3.80854 100.014 3.50989 98.7668 3.50989C97.4948 3.50989 96.3725 3.80854 95.3499 4.38096C94.3273 4.95338 93.5292 5.74979 92.9306 6.7453C92.332 7.74082 92.0327 8.88565 92.0327 10.1549C92.0327 11.4242 92.332 12.5691 92.9306 13.5646C93.5292 14.5601 94.3522 15.3565 95.3748 15.9289C96.3974 16.5013 97.5198 16.8 98.7918 16.8C100.014 16.8 101.161 16.5013 102.159 15.9289C103.181 15.3565 103.98 14.5601 104.603 13.5646C105.227 12.5691 105.526 11.4242 105.526 10.1549C105.476 8.86077 105.177 7.71593 104.578 6.72041ZM101.81 12.1211C101.51 12.7184 101.086 13.1664 100.563 13.4899C100.039 13.8134 99.4402 13.9877 98.7419 13.9877C98.0435 13.9877 97.42 13.8134 96.8962 13.4899C96.3725 13.1664 95.9485 12.7184 95.6492 12.1211C95.3499 11.5238 95.2002 10.8767 95.2002 10.1549C95.2002 9.4083 95.3499 8.76122 95.6492 8.1888C95.9485 7.61638 96.3725 7.1684 96.8962 6.84486C97.42 6.52131 98.0435 6.3471 98.7419 6.3471C99.4402 6.3471 100.039 6.52131 100.563 6.84486C101.086 7.19329 101.51 7.64126 101.81 8.1888C102.109 8.76122 102.259 9.4083 102.259 10.1549C102.259 10.8767 102.109 11.5238 101.81 12.1211Z"
            fill="black"
          />
          <path
            d="M117.722 5.82447C117.323 5.10273 116.749 4.5303 116.026 4.1321C115.303 3.73389 114.48 3.53479 113.532 3.53479C112.634 3.53479 111.836 3.73389 111.163 4.1321C110.639 4.43075 110.24 4.85385 109.94 5.37649V3.80856H107.072V16.5013H110.14V9.035C110.14 8.48747 110.24 7.98971 110.464 7.59151C110.689 7.1933 110.988 6.86976 111.387 6.64577C111.786 6.42178 112.235 6.29734 112.709 6.29734C113.233 6.29734 113.682 6.42178 114.056 6.64577C114.43 6.86976 114.729 7.1933 114.954 7.59151C115.178 7.98971 115.278 8.48747 115.278 9.035V16.5013H118.346V8.31325C118.321 7.36752 118.121 6.54622 117.722 5.82447Z"
            fill="black"
          />
        </svg>
      </motion.div>
    </div>
  );
};
