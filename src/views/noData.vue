<template>
  <div class="text-center q-py-lg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32.326"
      height="23.732"
      viewBox="0 0 31.326 23.732"
    >
      <g data-name="Group 7497">
        <g data-name="Group 7492">
          <path
            data-name="Path 2849"
            d="M-560.946-403.857a.074.074 0 0 1 .057.025.074.074 0 0 1 .02.059l-1.235 13.395a3.875 3.875 0 0 1-1.25 2.513 3.876 3.876 0 0 1-2.618 1.014h-21.1l1.119-17h25.008m0-.675h-25.64l-1.208 18.351h21.821a4.559 4.559 0 0 0 4.539-4.14l1.235-13.395a.751.751 0 0 0-.748-.82z"
            transform="translate(591.521 409.908)"
            style="fill: #c8ced3"
          />
        </g>
        <path
          data-name="Path 2850"
          d="m-652.836-483.615-1.189-15.715a.716.716 0 0 1 .714-.77h7.974a.716.716 0 0 1 .681.5l.731 2.266h15.12a.74.74 0 0 1 .74.74v2.022h-18.623s-.535 17.821-1.782 18.088a8.424 8.424 0 0 1-1.832.114 1.9 1.9 0 0 1-1.837-1.666z"
          transform="translate(654.027 500.099)"
          style="fill: #c8ced3"
        />
        <g data-name="Group 7493">
          <path
            data-name="Path 2851"
            d="M-430.641-324.3a5.262 5.262 0 0 1-5.256-5.256 5.262 5.262 0 0 1 5.256-5.256 5.262 5.262 0 0 1 5.256 5.256 5.262 5.262 0 0 1-5.256 5.256zm0-9.949a4.7 4.7 0 0 0-4.693 4.693 4.7 4.7 0 0 0 4.693 4.693 4.7 4.7 0 0 0 4.693-4.693 4.7 4.7 0 0 0-4.693-4.691z"
            transform="translate(448.167 344.108)"
            style="fill: #c8ced3"
          />
        </g>
        <g data-name="Group 7496">
          <g data-name="Group 7494">
            <path
              data-name="Path 2852"
              d="M-387.856-281.911a.28.28 0 0 1-.2-.082.281.281 0 0 1 0-.4l4.576-4.576a.281.281 0 0 1 .4 0 .281.281 0 0 1 0 .4l-4.576 4.576a.28.28 0 0 1-.2.082z"
              transform="translate(403.093 299.033)"
              style="fill: #c8ced3"
            />
          </g>
          <g data-name="Group 7495">
            <path
              data-name="Path 2853"
              d="M-383.28-281.911a.28.28 0 0 1-.2-.082l-4.576-4.576a.281.281 0 0 1 0-.4.281.281 0 0 1 .4 0l4.576 4.576a.281.281 0 0 1 0 .4.28.28 0 0 1-.2.082z"
              transform="translate(403.093 299.033)"
              style="fill: #c8ced3"
            />
          </g>
        </g>
      </g>
    </svg>

    <span class="block No-Data">{{text?text:'No Data'}}</span>
  </div>
</template>
    
<script setup>
defineProps({
  text: String
})
</script>
    
<style>
.No-Data {
  margin: 5.2px 0 0;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #c8ced3;
}
</style>