const fs = require('fs-extra');
const XLSX = require('xlsx');

const data = require('./display1.json')


// const nameMap = {
//   product_type: '商品类型',
//   product_type_name: '商品类型名称',
//   placement_group_id: '版位',
//   placement_group_id_name: '版位名称',
//   creative_template_id: '创意形式',
//   creative_template_id_name: '创意形式名称',
//   cost_percent: '消耗占比',
//   real_cost_micros: '日消耗'
// }

// const result = json.map(item => {
//   if (item.product_type == 12 || item.product_type == 23 || item.product_type == 46) {
//     return
//   }
//   return {
//     [nameMap.product_type]: item.product_type,
//     [nameMap.product_type_name]: item.product_type_name,
//     [nameMap.placement_group_id]: item.placement_group_id,
//     [nameMap.placement_group_id_name]: item.placement_group_id_name,
//     [nameMap.creative_template_id]: item.creative_template_id,
//     [nameMap.creative_template_id_name]: item.creative_template_id_name,
//     [nameMap.real_cost_micros]: item.real_cost_micros,
//     [nameMap.cost_percent]: (item.cost_percent * 100).toFixed(2) + '%',
//   }
// }).filter(item => item)

// fs.writeFile('data1.json', JSON.stringify(result), 'utf8', (err) => {
//   if (err) {
//     console.error('写入文件时出错：', err);
//     return;
//   }
//   console.log('JSON 数据已成功写入文件！');
// });



const rows = [{
     site_set: '',
      site_set_name: '站点集',
      position_id: '广告位id',
      position_id_name: '广告位名称',
      device_os_type_name: '操作系统',
      cost_percent: '消耗占比',
      period: '过滤阶段',
      dimension_cname: '过滤的定向维度',
      dimension_name: '定向名称',
      impacted_req_pv: '影响请求数',
      impacted_req_rate: '影响请求占比',
      suggestion: 'to-do',
      owner: '负责人',
      analysis_link: '分析链接'
}]
data.forEach(item => {
  if (!item.issue_list.length) {
    return;
  }

  for (const issue of item.issue_list) {
    if (issue.impacted_req_rate == null) {
      continue
    }

    const row = {
      site_set: item.site_set,
      site_set_name: item.site_set_name,
      position_id: item.position_id,
      position_id_name: item.position_id_name,
      device_os_type_name: item.device_os_type_name,
      cost_percent: (item.cost_percent * 100).toFixed(2) + '%',
      period: issue.period,
      dimension_cname: issue.dimension_cname,
      dimension_name: issue.dimension_name,
      impacted_req_pv: issue.impacted_req_pv,
      impacted_req_rate: (issue.impacted_req_rate * 100).toFixed(2) + '%',
      owner: issue.owner,
      suggestion: issue.suggestion,
      analysis_link: issue.analysis_link
    }
    rows.push(row)
  }
})

const worksheet = XLSX.utils.json_to_sheet(rows);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

const filePath = './display1.xlsx';
XLSX.writeFile(workbook, filePath);

console.log('JSON 数据已成功转换为 XLSX 文件！');