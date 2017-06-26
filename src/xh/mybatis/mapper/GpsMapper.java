package xh.mybatis.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface GpsMapper {
	/**
	 * 查询接收短信
	 * @return
	 * @throws Exception
	 */
	public List<HashMap<String,String>> gpsInfo(Map<String,Object> map)throws Exception;
	
	/**
	 * 短信总数
	 * @return
	 * @throws Exception
	 */
	public int  gpsCount(Map<String,Object> map)throws Exception;

}
