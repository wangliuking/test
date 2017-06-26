package xh.mybatis.mapper;

import java.util.List;
import java.util.Map;

import xh.mybatis.bean.AssetInfoBean;

public interface AssetInfoMapper {
	/**
	 * 查询资产记录
	 * @return
	 * @throws Exception
	 */
	public List<AssetInfoBean> assetInfo(Map<String,Object> map)throws Exception;
	/**
	 * 查询资产记录总数
	 * @return
	 * @throws Exception
	 */
	public int assetInfoCount(Map<String,Object> map)throws Exception;
	/**
	 * 添加资产
	 * @param bean
	 * @return
	 * @throws Exception
	 */
	public int insertAsset(AssetInfoBean bean)throws Exception;
	/**
	 *修改资产记录 
	 * @param bean
	 * @return
	 * @throws Exception
	 */
	public int updateAsset(AssetInfoBean bean)throws Exception;
	/**
	 * 删除记录
	 * @param list
	 * @return
	 * @throws Exception
	 */
	public int deleteAsset(List<String> list)throws Exception;


}
