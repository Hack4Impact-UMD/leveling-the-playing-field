export default function SelectedProfileIcon({ size = 50, viewboxSize = 75, transform = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewboxSize} ${viewboxSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle fill="currentColor" cx={viewboxSize / 2} cy={viewboxSize / 2} r={viewboxSize / 2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.5 12.5C33.1274 12.4992 28.831 13.6453 25.0398 15.8238C21.2485 18.0024 18.0949 21.1372 15.8938 24.9155C13.6927 28.6937 12.5211 32.9832 12.4959 37.3557C12.4706 41.7283 13.5927 46.031 15.75 49.8344C17.2082 47.9393 19.0826 46.405 21.2284 45.3499C23.3742 44.2949 25.7339 43.7475 28.125 43.75H46.875C49.2662 43.7475 51.6258 44.2949 53.7716 45.3499C55.9174 46.405 57.7919 47.9393 59.25 49.8344C61.4074 46.031 62.5294 41.7283 62.5042 37.3557C62.479 32.9832 61.3073 28.6937 59.1062 24.9155C56.9051 21.1372 53.7516 18.0024 49.9603 15.8238C46.169 13.6453 41.8727 12.4992 37.5 12.5ZM62.3219 56.4875C62.7136 55.9771 63.0886 55.4542 63.4469 54.9188C66.9114 49.7709 68.7581 43.7051 68.75 37.5C68.75 20.2406 54.7594 6.25 37.5 6.25C20.2407 6.25 6.25003 20.2406 6.25003 37.5C6.24018 44.3649 8.50016 51.0404 12.6782 56.4875L12.6625 56.5438L13.7719 57.8344C16.7028 61.261 20.3419 64.0113 24.4383 65.8958C28.5347 67.7802 32.991 68.754 37.5 68.75C38.175 68.75 38.8459 68.7292 39.5125 68.6875C45.1513 68.3319 50.5865 66.4467 55.2344 63.2344C57.4573 61.7009 59.472 59.8858 61.2282 57.8344L62.3375 56.5438L62.3219 56.4875ZM37.5 18.75C35.0136 18.75 32.6291 19.7377 30.8709 21.4959C29.1128 23.254 28.125 25.6386 28.125 28.125C28.125 30.6114 29.1128 32.996 30.8709 34.7541C32.6291 36.5123 35.0136 37.5 37.5 37.5C39.9864 37.5 42.371 36.5123 44.1292 34.7541C45.8873 32.996 46.875 30.6114 46.875 28.125C46.875 25.6386 45.8873 23.254 44.1292 21.4959C42.371 19.7377 39.9864 18.75 37.5 18.75Z"
        fill="#14676B"
        transform={transform}
      />
    </svg>
  );
}
