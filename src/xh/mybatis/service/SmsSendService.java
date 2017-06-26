package xh.mybatis.service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import xh.mybatis.mapper.SmsSendMapper;
import xh.mybatis.tools.MoreDbTools;

public class SmsSendService {
	/**
	 * 查询短信信息
	 * 
	 * @param root
	 * @return
	 */
	public static List<HashMap<String,String>> recInfo(Map<String, Object> map) {
		SqlSession sqlSession = MoreDbTools.getSession(MoreDbTools.DataSourceEnvironment.slave);
		SmsSendMapper mapper = sqlSession.getMapper(SmsSendMapper.class);
		List<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();
		try {
			list = mapper.recInfo(map);
			sqlSession.close();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 短信总数
	 * 
	 * @return
	 * @throws Exception
	 */
	public static int recCount(Map<String, Object> map) {
		SqlSession sqlSession = MoreDbTools.getSession(MoreDbTools.DataSourceEnvironment.slave);
		SmsSendMapper mapper = sqlSession.getMapper(SmsSendMapper.class);
		int count = 0;
		try {
			count = mapper.recCount(map);
			sqlSession.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return count;
	}

	/**
	 * 删除短信
	 * 
	 * @return
	 * @throws Exception
	 */
	public static void deleteById(List<String> list) {
		SqlSession sqlSession = MoreDbTools.getSession(MoreDbTools.DataSourceEnvironment.master);
		SmsSendMapper mapper = sqlSession.getMapper(SmsSendMapper.class);
		try {
			mapper.deleteById(list);
			sqlSession.commit();
			sqlSession.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
