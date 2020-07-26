import request from '@/utils/request'

var base_url="http://127.0.0.1:8080"

export function getTableData() {
  return request({
    url: base_url+'/test',
    method: 'get',
  })
}

export function getStatisticData() {
  return request({
    url: base_url+'/test1',
    method: 'get',
  })
}

