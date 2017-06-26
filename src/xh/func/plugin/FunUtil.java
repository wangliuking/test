package xh.func.plugin;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import xh.org.listeners.SingLoginListener;


public class FunUtil {
	protected final Log log = LogFactory.getLog(FunUtil.class);
	public String xmlPath() {
		String str = FunUtil.class.getResource("/conf.xml").getPath();
		return str;
	}
	//获取登录用户
	public String loginUser(HttpServletRequest request){
		String user="";
		try {
			user=SingLoginListener.getLogUserMap().get(request.getSession().getId()).toString();
		} catch (NullPointerException e) {
			// TODO: handle exception
			log.info("操作日志写入失败，系统未登录");
		}
		return user;
		
	}
	//设置cookie
	public void addCookie(HttpServletResponse response,String name,String value) throws UnsupportedEncodingException{
		Cookie cookie = new Cookie(name, URLEncoder.encode(value, "UTF-8"));
		cookie.setMaxAge(60*60*24*7*36);	
		cookie.setPath("/");
		response.addCookie(cookie);
	}
	//获取cookie
	public String getCookie(HttpServletRequest request,String name) throws UnsupportedEncodingException{
		Cookie[] cookies = request.getCookies();
		for(Cookie cookie : cookies)
		{
			if(cookie.getName().equals(name))
			{
				return URLDecoder.decode(cookie.getValue(), "UTF-8");
			
			}
		}
        return null;
    }
	//清楚cookie
	public void removeCookie(HttpServletRequest request,HttpServletResponse response,String str) {
    	//request.setCharacterEncoding("GB18030");
		Cookie cookie=new Cookie(str,null);
		cookie.setMaxAge(0);
		cookie.setPath("/");
        response.addCookie(cookie);
	}
	//设置session
	public void addSession(HttpServletRequest request,String name,String value){
		request.getSession().setAttribute(name, value);
	}
	//获取session
	public void getSession(HttpServletRequest request,String name){
		request.getSession().getAttribute(name);
	}
	//移除session
	public void removeSession(HttpServletRequest request,String name,String value){
		request.getSession().removeAttribute(name);
	}

	// 生成数字加字符串的随机字符串
	public String RandomWord() {
		String[] beforeShuffle = new String[] { "1", "2", "3", "4", "5", "6",
				"7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",
				"J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
				"V", "W", "X", "Y", "Z" };
		List list = Arrays.asList(beforeShuffle);
		Collections.shuffle(list);
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < list.size(); i++) {
			sb.append(list.get(i));
		}
		String afterShuffle = sb.toString();
		String result = afterShuffle.substring(1, 9);
		return result;
	}

	// 判断文件是否为空
	public boolean fileIsNull(String file) {
		FileReader fir = null;
		boolean flg = false;
		try {
			fir = new FileReader(file);
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
			if (fir.read() == -1) {
				flg = true;
			} else {
				flg = false;
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			fir.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return flg;

	}

	// 获取当前时间
	public String nowDate() {
		SimpleDateFormat dd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		dd.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
		String date = dd.format(new Date());
		return date;
	}
	// 获取当前时间
	public String nowDateNoTime() {
		SimpleDateFormat dd = new SimpleDateFormat("yyyy-MM-dd 00:00:00");
		dd.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
		String date = dd.format(new Date());
		return date;
	}

	// 读取xml文档
	public String readXml(String str1, String str2) {
		String fileName = xmlPath();
		String value = "";
		try {
			File f = new File(fileName);
			if (!f.exists()) {
				System.out.println("  Error : Config file doesn't exist!");
				System.exit(1);
			}
			SAXReader reader = new SAXReader();
			Document doc;
			doc = reader.read(f);
			Element root = doc.getRootElement();
			Element data;
			Iterator<?> itr = root.elementIterator(str1);
			data = (Element) itr.next();

			value = data.elementText(str2).trim();

		} catch (Exception ex) {
			System.out.println("Error : " + ex.toString());
		}
		return value;

	}
	//更新xml配置文件
	public void updateXML(String str1, String str2, String value)
			throws Exception {

		String filename = xmlPath();
		SAXReader sax = new SAXReader();
		Document xmlDoc = sax.read(new File(filename));
		List<Element> eleList = xmlDoc.selectNodes("/config/" + str1 + "/"+ str2);
		Iterator<Element> eleIter = eleList.iterator();
		if (eleIter.hasNext()) {
			Element ownerElement = eleIter.next();
			ownerElement.setText(value);
		}
		OutputFormat format = OutputFormat.createPrettyPrint();
		// 利用格式化类对编码进行设置
		format.setEncoding("UTF-8");
		FileOutputStream output = new FileOutputStream(new File(filename));
		XMLWriter writer = new XMLWriter(output, format);
		writer.write(xmlDoc);
		writer.flush();
		writer.close();
	}
	public int StringToInt(String str){
		int value=-1;
		try {
			value= Integer.parseInt(str.trim());
		} catch (NumberFormatException e) {
			// TODO: handle exception
			log.info("数字字符串解析失败");
		}catch (NullPointerException e) {
			// TODO: handle exception
			log.info("数字字符串为空");
		}
		return value;
	}
	public String getIpAddr(HttpServletRequest request) {
		 String ip = request.getHeader("x-forwarded-for");
		    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		        ip = request.getHeader("Proxy-Client-IP");
		    }
		    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		        ip = request.getHeader("WL-Proxy-Client-IP");
		    }
		    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		        ip = request.getHeader("HTTP_CLIENT_IP");
		    }
		    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		        ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		    }
		    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		        ip = request.getRemoteAddr();
		    }
		    return ip;
		}
	public String MD5(String originstr){
		String result = null;
		char hexDigits[] = {//用来将字节转换成 16 进制表示的字符
				'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'}; 
		if(originstr != null){
			try {
				//返回实现指定摘要算法的 MessageDigest 对象
				MessageDigest md = MessageDigest.getInstance("MD5");
				//使用utf-8编码将originstr字符串编码并保存到source字节数组
				byte[] source = originstr.getBytes("utf-8");
				//使用指定的 byte 数组更新摘要
				md.update(source);
				//通过执行诸如填充之类的最终操作完成哈希计算，结果是一个128位的长整数
				byte[] tmp = md.digest();
				//用16进制数表示需要32位
				char[] str = new char[32];
				for(int i=0,j=0; i < 16; i++){
					//j表示转换结果中对应的字符位置
					//从第一个字节开始，对 MD5 的每一个字节
					//转换成 16 进制字符
					byte b = tmp[i];
					//取字节中高 4 位的数字转换
					//无符号右移运算符>>> ，它总是在左边补0
					//0x代表它后面的是十六进制的数字. f转换成十进制就是15
					str[j++] = hexDigits[b>>>4 & 0xf];
					// 取字节中低 4 位的数字转换
					str[j++] = hexDigits[b&0xf];
				}
				result = new String(str);//结果转换成字符串用于返回
			} catch (NoSuchAlgorithmException e) {
				//当请求特定的加密算法而它在该环境中不可用时抛出此异常
				e.printStackTrace();
			} catch (UnsupportedEncodingException e) {
				//不支持字符编码异常
				e.printStackTrace();
			}
		}
		return result;
	}

}
