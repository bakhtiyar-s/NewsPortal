<%--
  Created by IntelliJ IDEA.
  User: Bakhtiyar
  Date: 04.05.2021
  Time: 09:47
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>News View</title>
</head>
<body>
    <jsp:include page="/WEB-INF/view/header.jsp"/>
    <div>
        <h3>News >> News View</h3>
    </div>
<%--    <div>--%>
<%--        <c:if test="${!empty news}">--%>
<%--            <table style="width:80%">--%>
<%--                <tr>--%>
<%--                    <th>News Title:</th>--%>
<%--                    <td>${news.title}</td>--%>
<%--                </tr>--%>
<%--                <tr>--%>
<%--                    <th>News Date</th>--%>
<%--                    <td>${news.newsDate}</td>--%>
<%--                </tr>--%>
<%--                <tr>--%>
<%--                    <th>Brief</th>--%>
<%--                    <td>${news.brief}</td>--%>
<%--                </tr>--%>
<%--                <tr>--%>
<%--                    <th>Content</th>--%>
<%--                    <td>${news.content}</td>--%>
<%--                </tr>--%>
<%--            </table>--%>
<%--        </c:if>--%>
<%--    </div>--%>
</body>
</html>
