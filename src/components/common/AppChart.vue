<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions } from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const props = withDefaults(
  defineProps<{
    type: 'line' | 'bar'
    series: ApexOptions['series']
    options?: ApexOptions
    height?: number
    label: string
  }>(),
  { options: () => ({}), height: 280 },
)

const theme = useTheme()

const mode = computed(() => (theme.global.current.value.dark ? 'dark' : 'light'))

const mergedOptions = computed<ApexOptions>(() => {
  const isDark = mode.value === 'dark'

  return {
    ...props.options,
    chart: {
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
      foreColor: isDark ? '#B9BAC2' : '#5B5C66',
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: false },
      ...props.options.chart,
    },
    theme: { mode: mode.value },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    grid: { borderColor: isDark ? '#34353F' : '#E8E7E2', strokeDashArray: 0 },
    tooltip: { theme: mode.value, ...props.options.tooltip },
  }
})
</script>

<template>
  <div :aria-label="label" role="img">
    <!-- The key rebuilds the chart when the theme changes. -->
    <VueApexCharts
      :key="mode"
      :height="height"
      :options="mergedOptions"
      :series="series"
      :type="type"
    />
  </div>
</template>
