package xh.mybatis.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import xh.mybatis.bean.WebRoleBean;
import xh.mybatis.mapper.WebRoleMapper;
import xh.mybatis.tools.DbTools;
import xh.mybatis.tools.MoreDbTools;

public class WebRoleService {
	
	/**
	 * 查询所有角色
	 * @return
	 */
	public static List<WebRoleBean> roleByAll(){
		SqlSession sqlSession=MoreDbTools.getSession(MoreDbTools.DataSourceEnvironment.slave);
		WebRoleMapper mapper=sqlSession.getMapper(WebRoleMapper.class);
		List<WebRoleBean> list=new ArrayList<WebRoleBean>();
		try {
			list=mapper.roleByAll();			
			sqlSession.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return  list;
		
		
	}
	/**
	 * 根据用户查询角色roleId
	 * @param user
	 * @return
	 */
	public static int roleIdByUserId(String user){
		SqlSession sqlSession=MoreDbTools.getSession(MoreDbTools.DataSourceEnvironment.slave);
		WebRoleMapper mapper=sqlSession.getMapper(WebRoleMapper.class);
		int roleId=-1;
		try {
			roleId=mapper.roleIdByUser(user);			
			sqlSession.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return  roleId;
	}
	/**
	 * 根据用户查询角色roleId
	 * @param user
	 * @return
	 */
	public static String roleByUserId(String user){
		SqlSession sqlSession=MoreDbTools.getSession(MoreDbTools.DataSourceEnvironment.slave);
		WebRoleMapper mapper=sqlSession.getMapper(WebRoleMapper.class);
		String role="";
		try {
			role=mapper.roleByUser(user);			
			sqlSession.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return  role;
	}
	/**
	 * 添加角色
	 * @param bean
	 * @return
	 */
	public static int addRole(WebRoleBean bean){
		SqlSession sqlSession=MoreDbTools.getSession(MoreDbTools.DataSourceEnvironment.master);
		WebRoleMapper mapper=sqlSession.getMapper(WebRoleMapper.class);
		int count=-1;
		try {
			count=mapper.roleIsExists(bean);
			if(count==0){
				mapper.addRole(bean);
				sqlSession.commit();
				sqlSession.close();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return  count;	
	}
	/**
	 * 更新角色
	 * @param bean
	 * @return
	 */
	public static int updateByroleId(WebRoleBean bean){
		SqlSession sqlSession=MoreDbTools.getSession(MoreDbTools.DataSourceEnvironment.master);
		WebRoleMapper mapper=sqlSession.getMapper(WebRoleMapper.class);
		int count=-1;
		try {
			count=mapper.updateByroleId(bean);
			sqlSession.commit();
			sqlSession.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return  count;	
	}
	/**
	 * 删除角色
	 * @param list
	 * @return
	 */
	public static int deleteByRoleId(List<String> list){
		SqlSession sqlSession=MoreDbTools.getSession(MoreDbTools.DataSourceEnvironment.master);
		WebRoleMapper mapper=sqlSession.getMapper(WebRoleMapper.class);
		int result=-1;
		try {
			result=mapper.deleteByRoleId(list);
			sqlSession.commit();		
			sqlSession.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

}
