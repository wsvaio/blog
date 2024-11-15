<script setup lang="ts" generic="T extends object">
const { data = [] } = defineProps<{ data?: ({ date: Date; content?: string } & T)[] }>();
const tree = computed(() => {
  if (!data.length)
    return [];
  const years = new Set<number>();
  const list = data.map(item => {
    const date = item.date;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    years.add(date.getFullYear());
    return {
      ...item,
      year,
      month,
      day,
    };
  });
  return [...years].map(year => ({
    year,
    items: list.filter(sub => sub.year === year),
    months: [...new Set(list.filter(item => item.year === year).map(item => item.month))].map(month => {
      return {
        month,
        items: list.filter(sub => sub.year === year && sub.month === month),
        days: [...new Set(list.filter(item => item.year === year && item.month === month).map(item => item.day))].map(day => ({
          day,
          items: list.filter(sub => sub.year === year && sub.month === month && sub.day === day),
        }))
      };
    }),
  }));
});
</script>

<template>
  <ul v-for="item in tree" list="none">
    <li grid="~ cols-[.382fr_max-content_1fr]" gap="2em" items="center">
      <div />
      <h2>
        <slot name="year" :="item">{{ item.year }}</slot>
      </h2>
      <div />
    </li>
    <template v-for="sub in item.months">
      <li grid="~ cols-[.382fr_max-content_1fr]" gap="2em" items="center">
        <h3 text="right">
          <slot name="month" :="sub">{{ sub.month + 1 }}月</slot>
        </h3>
        <div bg="[var(--primary-color)]" h="min-4em full" w=".25em" pos="relative">
          <div
            pos="absolute"
            left="50%"
            top="50%"
            transform="translate-x-[-50%] translate-y-[-50%]"
            bg="[var(--primary-color)]"
            w="1em"
            h="1em"
            rounded="full"
            border=".25em solid white"
            shadow="md"
          />
        </div>
        <div />
      </li>
      <template v-for="ssub in sub.days">
        <li grid="~ cols-[.382fr_max-content_1fr]" gap="2em" items="center">
          <div text="right">
            <slot name="day" :="ssub">{{ ssub.day }}日</slot>
          </div>
          <div bg="[var(--primary-color)]" h="4em" w=".25em" pos="relative">
            <div
              pos="absolute"
              left="50%"
              top="50%"
              transform="translate-x-[-50%] translate-y-[-50%]"
              bg="[var(--primary-color)]"
              w=".75em"
              h=".75em"
              rounded="full"
              border=".125em solid white"
              shadow="md"
            />
          </div>
          <slot :="ssub.items?.[0] || {}">{{ ssub.items?.[0]?.content }}</slot>
        </li>

        <template v-for="sssub in ssub.items?.slice(1)">
          <li grid="~ cols-[.382fr_max-content_1fr]" gap="2em" items="center">
            <div text="right">
              <!-- <slot name="day" :="ssub">{{ new Date(ssub.date).getDate() }}日</slot> -->
            </div>
            <div bg="[var(--primary-color)]" h="4em" w=".25em" pos="relative">
              <div
                pos="absolute"
                left="50%"
                top="50%"
                transform="translate-x-[-50%] translate-y-[-50%]"
                bg="[var(--primary-color)]"
                w=".75em"
                h=".75em"
                rounded="full"
                border=".125em solid white"
                shadow="md"
              />
            </div>
            <slot :="sssub">{{ sssub.content }}</slot>
          </li>
        </template>
      </template>
    </template>
  </ul>
</template>

<style scoped>

</style>
