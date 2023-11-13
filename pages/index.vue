<script setup lang="ts">
const { data } = await useFetch<any[]>("/api/article");
</script>

<template>
	<el-row>
		<el-col :span="24">
			<el-card v-for="item in data" @click="$router.push(`/${item.id}`)">
				<template #header>
					<h2 m="0">
						<span>{{ item.title }}</span>
						<el-tag>{{ item.type.name }}</el-tag>
					</h2>
				</template>

				<el-descriptions>
					<el-descriptions-item :span="4">
						<el-tag v-for="sub in item.tags" type="info">
							{{ sub.name }}
						</el-tag>
					</el-descriptions-item>
					<el-descriptions-item label="更新时间">
						{{ item.updateAt }}
					</el-descriptions-item>
					<el-descriptions-item label="创建时间">
						{{ item.createAt }}
					</el-descriptions-item>
				</el-descriptions>
			</el-card>
		</el-col>
	</el-row>
</template>

<style lang="less" scoped></style>
