import * as React from "react";

export default function ShoppingCartIcon({
  size = 45,                
  viewBoxSize = 29,         
  showCircle= false
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {showCircle && <circle fill='currentColor' cx={viewBoxSize / 2} cy={viewBoxSize / 2} r={viewBoxSize / 2} />}
      <path
        d="M11.2475 29C10.3914 29 9.57036 28.6181 8.96502 27.9383C8.35968 27.2584 8.0196 26.3364 8.0196 25.375C8.0196 24.4136 8.35968 23.4916 8.96502 22.8117C9.57036 22.1319 10.3914 21.75 11.2475 21.75C12.1035 21.75 12.9246 22.1319 13.5299 22.8117C14.1352 23.4916 14.4753 24.4136 14.4753 25.375C14.4753 26.3364 14.1352 27.2584 13.5299 27.9383C12.9246 28.6181 12.1035 29 11.2475 29ZM22.545 29C21.6889 29 20.8679 28.6181 20.2625 27.9383C19.6572 27.2584 19.3171 26.3364 19.3171 25.375C19.3171 24.4136 19.6572 23.4916 20.2625 22.8117C20.8679 22.1319 21.6889 21.75 22.545 21.75C23.4011 21.75 24.2221 22.1319 24.8274 22.8117C25.4328 23.4916 25.7728 24.4136 25.7728 25.375C25.7728 26.3364 25.4328 27.2584 24.8274 27.9383C24.2221 28.6181 23.4011 29 22.545 29ZM1.50255 3.48544C1.09965 3.47084 0.7176 3.28084 0.437191 2.95561C0.156782 2.63038 0 2.19542 0 1.74272C0 1.29001 0.156782 0.855055 0.437191 0.529826C0.7176 0.204596 1.09965 0.0145939 1.50255 0L3.36018 0C4.81595 0 6.07481 1.13463 6.39115 2.72962L8.4134 12.9557C8.72973 14.5507 9.9886 15.6854 11.4444 15.6854H23.5682L25.8955 5.22725H10.8133C10.4142 5.2068 10.0375 5.01435 9.76149 4.68994C9.4855 4.36552 9.33149 3.93412 9.33149 3.48544C9.33149 3.03676 9.4855 2.60535 9.76149 2.28094C10.0375 1.95652 10.4142 1.76408 10.8133 1.74363H25.8955C26.3673 1.74347 26.8329 1.86412 27.257 2.0964C27.681 2.32868 28.0524 2.66648 28.3427 3.08412C28.6331 3.50176 28.8348 3.98825 28.9326 4.50659C29.0304 5.02494 29.0217 5.56151 28.9071 6.0755L26.5798 16.53C26.412 17.2844 26.0245 17.954 25.4788 18.4326C24.9331 18.9111 24.2606 19.1709 23.5682 19.1708H11.4444C10.0318 19.171 8.6615 18.6302 7.55965 17.6376C6.4578 16.6451 5.69036 15.2601 5.38405 13.7116L3.36018 3.48544H1.50255Z"
        fill="white"
      />
    </svg>
  );
}
