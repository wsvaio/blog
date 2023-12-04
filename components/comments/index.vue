<script setup lang="ts">
const data = [
	{
		id: 1,
		avatar: "/favicon.ico",
		name: "老王",
		email: "wsvaio@qq.com",
		content: "这是一条评论",
		comments: [
			{
				id: 2,
				avatar: "/favicon.ico",
				name: "老王",
				email: "wsvaio@qq.com",
				content: "这是一条回复",
				comments: [
					{
						id: 1,
						avatar: "/favicon.ico",
						name: "老王",
						email: "wsvaio@qq.com",
						content: "这是一条评论",
						comments: [
							{
								id: 2,
								avatar: "/favicon.ico",
								name: "老王",
								email: "wsvaio@qq.com",
								content: "这是一条回复",
								comments: [
									{
										id: 1,
										avatar: "/favicon.ico",
										name: "老王",
										email: "wsvaio@qq.com",
										content: "这是一条评论",
										comments: [
											{
												id: 2,
												avatar: "/favicon.ico",
												name: "老王",
												email: "wsvaio@qq.com",
												content: "这是一条回复",
												comments: [
													{
														id: 1,
														avatar: "/favicon.ico",
														name: "老王",
														email: "wsvaio@qq.com",
														content: "这是一条评论",
														comments: [
															{
																id: 2,
																avatar: "/favicon.ico",
																name: "老王",
																email: "wsvaio@qq.com",
																content: "这是一条回复",
																comments: [
																	{
																		id: 1,
																		avatar: "/favicon.ico",
																		name: "老王",
																		email: "wsvaio@qq.com",
																		content: "这是一条评论",
																		comments: [
																			{
																				id: 2,
																				avatar: "/favicon.ico",
																				name: "老王",
																				email: "wsvaio@qq.com",
																				content: "这是一条回复",
																				comments: [{
																					id: 1,
																					avatar: "/favicon.ico",
																					name: "老王",
																					email: "wsvaio@qq.com",
																					content: "这是一条评论",
																					comments: [
																						{
																							id: 2,
																							avatar: "/favicon.ico",
																							name: "老王",
																							email: "wsvaio@qq.com",
																							content: "这是一条回复",
																							comments: [{
																								id: 1,
																								avatar: "/favicon.ico",
																								name: "老王",
																								email: "wsvaio@qq.com",
																								content: "这是一条评论",
																								comments: [
																									{
																										id: 2,
																										avatar: "/favicon.ico",
																										name: "老王",
																										email: "wsvaio@qq.com",
																										content: "这是一条回复",
																										comments: [{
																											id: 1,
																											avatar: "/favicon.ico",
																											name: "老王",
																											email: "wsvaio@qq.com",
																											content: "这是一条评论",
																											comments: [
																												{
																													id: 2,
																													avatar: "/favicon.ico",
																													name: "老王",
																													email: "wsvaio@qq.com",
																													content: "这是一条回复",
																													comments: [{
																														id: 1,
																														avatar: "/favicon.ico",
																														name: "老王",
																														email: "wsvaio@qq.com",
																														content: "这是一条评论",
																														comments: [
																															{
																																id: 2,
																																avatar: "/favicon.ico",
																																name: "老王",
																																email: "wsvaio@qq.com",
																																content: "这是一条回复",
																																comments: [{
																																	id: 1,
																																	avatar: "/favicon.ico",
																																	name: "老王",
																																	email: "wsvaio@qq.com",
																																	content: "这是一条评论",
																																	comments: [
																																		{
																																			id: 2,
																																			avatar: "/favicon.ico",
																																			name: "老王",
																																			email: "wsvaio@qq.com",
																																			content: "这是一条回复",
																																			comments: [],
																																		},
																																	],
																																},],
																															},
																														],
																													},],
																												},
																											],
																										},],
																									},
																								],
																							},],
																						},
																					],
																				},],
																			},
																		],
																	},
																],
															},
														],
													},
												],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},

	{
		id: 3,
		avatar: "/favicon.ico",
		name: "老王",
		email: "wsvaio@qq.com",
		content: "这是一条评论",
		comments: [],
	},
	{
		id: 3,
		avatar: "/favicon.ico",
		name: "老王",
		email: "wsvaio@qq.com",
		content: "这是一条评论",
		comments: [],
	},
	{
		id: 3,
		avatar: "/favicon.ico",
		name: "老王",
		email: "wsvaio@qq.com",
		content: "这是一条评论",
		comments: [],
	},
];
</script>

<template>
	<div class="card ">
		<h3>Comments|2条评论</h3>

		<div class="overflow-auto">
			<comment :list="data" pl="0" />
		</div>
	</div>
</template>

<style lang="less" scoped></style>
