type ButtonLoginProps = {
  active?: boolean;
};

export default function Button(props: ButtonLoginProps) {
  const { active } = props;
  return (
    <div
      style={{
        marginRight: 10,
        background: active ? '#eee' : 'transparent',
        borderRadius: 2,
      }}
    >
      <svg
        width="32"
        height="24"
        viewBox="0 0 86 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.4129 20.1318C18.8158 20.1318 18.332 20.6161 18.332 21.2136V30.7078C18.332 31.3053 18.8158 31.7896 19.4129 31.7896H28.9012C29.4983 31.7896 29.9821 31.3053 29.9821 30.7103V21.2136C29.9821 20.6161 29.4983 20.1318 28.9012 20.1318H19.4129Z"
          fill="url(#paint0_linear_1160_222)"
        />
        <path
          d="M10.5162 40.2197C9.88055 40.2197 9.36328 40.7349 9.36328 41.3711V46.6719C9.36328 47.3081 9.88055 47.8232 10.5162 47.8232H15.8098C16.4455 47.8232 16.9601 47.3055 16.9601 46.6719V41.3711C16.9601 40.7349 16.4455 40.2197 15.8098 40.2197H10.5162Z"
          fill="url(#paint1_linear_1160_222)"
        />
        <path
          d="M1.54878 40.2197C0.913131 40.2197 0.398438 40.7349 0.398438 41.3711V46.6719C0.398438 47.3081 0.913131 47.8232 1.54878 47.8232H6.84497C7.48061 47.8232 7.99531 47.3055 7.99531 46.6719V41.3711C7.99531 40.7349 7.47804 40.2197 6.84497 40.2197H1.54878Z"
          fill="url(#paint2_linear_1160_222)"
        />
        <path
          d="M1.54878 32.2812C0.91313 32.2812 0.398438 32.7964 0.398438 33.4326V37.3322C0.398438 37.9684 0.91313 38.4836 1.54878 38.4836H5.445C6.08064 38.4836 6.59791 37.9684 6.59791 37.3322V33.4326C6.59791 32.7964 6.08064 32.2812 5.445 32.2812H1.54878Z"
          fill="url(#paint3_linear_1160_222)"
        />
        <path
          d="M1.54878 24.9355C0.913131 24.9355 0.398438 25.4507 0.398438 26.0869V29.3941C0.398438 30.0303 0.913131 30.5455 1.54878 30.5455H4.85311C5.49133 30.5455 6.00602 30.0303 6.00602 29.3941V26.0869C6.00602 25.4507 5.49133 24.9355 4.85311 24.9355H1.54878Z"
          fill="url(#paint4_linear_1160_222)"
        />
        <path
          d="M1.54877 18.8877C0.91313 18.8877 0.398438 19.4054 0.398438 20.0416V22.0481C0.398438 22.6843 0.91313 23.202 1.54877 23.202H3.5535C4.18915 23.202 4.70641 22.6843 4.70641 22.0481V20.0416C4.70641 19.4054 4.18915 18.8877 3.5535 18.8877H1.54877Z"
          fill="url(#paint5_linear_1160_222)"
        />
        <path
          d="M19.3177 33.4072C18.7747 33.4072 18.332 33.8503 18.332 34.3937V46.868C18.332 47.4166 18.7747 47.857 19.3177 47.857H36.0169C36.5624 47.857 37.0025 47.4166 37.0025 46.868V34.3937C37.0025 33.8477 36.5624 33.4072 36.0169 33.4072H19.3177Z"
          fill="url(#paint6_linear_1160_222)"
        />
        <path
          d="M32.7824 13.4298C31.892 13.1748 30.9526 13.0357 29.9799 13.0357C26.2303 13.0357 22.9569 15.0731 21.1992 18.1022H29.9773C31.0196 18.1022 31.8662 18.947 31.8662 19.9928V31.7896H39.898C40.845 31.7896 41.6145 32.5597 41.6145 33.5076V47.8595H71.4847C79.115 47.8595 85.299 41.67 85.299 34.0305C85.299 27.1842 80.3271 21.5047 73.8008 20.3997C73.335 9.05367 63.9985 0 52.5517 0C43.5832 0 35.9066 5.56099 32.7824 13.4298Z"
          fill="url(#paint7_linear_1160_222)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1160_222"
            x1="24.1571"
            y1="19.61"
            x2="24.1571"
            y2="48.3046"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F58220" />
            <stop offset="1" stopColor="#F04E25" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1160_222"
            x1="13.1617"
            y1="19.6099"
            x2="13.1617"
            y2="48.3044"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F58220" />
            <stop offset="1" stopColor="#F04E25" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_1160_222"
            x1="4.19687"
            y1="19.6099"
            x2="4.19687"
            y2="48.3044"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F58220" />
            <stop offset="1" stopColor="#F04E25" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_1160_222"
            x1="3.4982"
            y1="19.6097"
            x2="3.4982"
            y2="48.3043"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F58220" />
            <stop offset="1" stopColor="#F04E25" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_1160_222"
            x1="3.20223"
            y1="19.61"
            x2="3.20223"
            y2="48.3046"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F58220" />
            <stop offset="1" stopColor="#F04E25" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_1160_222"
            x1="2.55245"
            y1="19.61"
            x2="2.55245"
            y2="48.3045"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F58220" />
            <stop offset="1" stopColor="#F04E25" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_1160_222"
            x1="27.6673"
            y1="19.6101"
            x2="27.6673"
            y2="48.3047"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F58220" />
            <stop offset="1" stopColor="#F04E25" />
          </linearGradient>
          <linearGradient
            id="paint7_linear_1160_222"
            x1="53.2491"
            y1="0.224835"
            x2="53.2491"
            y2="47.54"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2DC3E8" />
            <stop offset="1" stopColor="#0097D6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
