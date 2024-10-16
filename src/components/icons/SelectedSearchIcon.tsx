export default function SelectedSearchIcon({ size = 50, viewboxSize = 50, fillColor = "currentColor", transform = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewboxSize} ${viewboxSize}`}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle fill={fillColor} cx={viewboxSize / 2} cy={viewboxSize / 2} r={viewboxSize / 2} />
      <path
        d="M19.3363 33.8376C21.2406 33.8376 23.1263 33.4625 24.8857 32.7337C26.6451 32.005 28.2437 30.9368 29.5902 29.5902C30.9368 28.2437 32.005 26.6451 32.7337 24.8857C33.4625 23.1263 33.8376 21.2406 33.8376 19.3363C33.8376 17.4319 33.4625 15.5462 32.7337 13.7869C32.005 12.0275 30.9368 10.4289 29.5902 9.08231C28.2437 7.73574 26.6451 6.66758 24.8857 5.93883C23.1263 5.21007 21.2406 4.83498 19.3363 4.83498C15.4903 4.83498 11.8018 6.36279 9.08231 9.08231C6.36279 11.8018 4.83498 15.4903 4.83498 19.3363C4.83498 23.1823 6.36279 26.8707 9.08231 29.5902C11.8018 32.3098 15.4903 33.8376 19.3363 33.8376ZM34.611 31.1935L43.2634 39.8459C43.4941 40.0691 43.678 40.3359 43.8045 40.6308C43.9309 40.9258 43.9974 41.243 43.9999 41.5639C44.0025 41.8848 43.9411 42.203 43.8194 42.4999C43.6976 42.7969 43.518 43.0666 43.2909 43.2934C43.0638 43.5201 42.7938 43.6994 42.4967 43.8207C42.1996 43.942 41.8813 44.0029 41.5604 43.9999C41.2395 43.9969 40.9224 43.93 40.6276 43.8032C40.3329 43.6763 40.0663 43.492 39.8435 43.261L31.1911 34.6086C27.3058 37.6245 22.4173 39.0464 17.5206 38.5848C12.6239 38.1232 8.08715 35.8129 4.8339 32.1241C1.58064 28.4354 -0.144559 23.6454 0.00949597 18.7295C0.163551 13.8135 2.18528 9.14095 5.66312 5.66312C9.14095 2.18528 13.8135 0.163551 18.7295 0.00949597C23.6454 -0.144559 28.4354 1.58064 32.1241 4.8339C35.8129 8.08715 38.1232 12.6239 38.5848 17.5206C39.0464 22.4173 37.6245 27.3058 34.6086 31.1911L34.611 31.1935Z"
        fill="#14676B"
        transform={transform || "translate(5, 5) scale(0.8)"}
      />
    </svg>
  );
}
