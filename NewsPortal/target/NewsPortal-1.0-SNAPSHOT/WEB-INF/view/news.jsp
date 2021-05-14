<%--
  Created by IntelliJ IDEA.
  User: Bakhtiyar
  Date: 26.04.2021
  Time: 23:39
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>News Page</title>
</head>
<body>
    <jsp:include page="/WEB-INF/view/header.jsp"/>

    <br/>
    <br/>
    <h1>News list</h1>
    <c:if test="${!empty newsList}">
        <table>
            <tr>
                <th>Title</th>
                <th>Brief</th>
                <th>Date</th>
                <th>Content</th>
            </tr>
            <c:forEach items="${newsList}" var="item">
                <tr>
                    <td>${item.title}</td>
                    <td>${item.brief}</td>
                    <td>${item.newsDate}</td>
                    <td>${item.content}</td>
                </tr>
                <a href="/newsdata/${item.id}">view</a>
            </c:forEach>
        </table>
    </c:if>

</body>
</html>



<%--<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>--%>
<%--<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>--%>
<%--<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>--%>
<%--<%@ taglib prefix="from" uri="http://www.springframework.org/tags/form" %>--%>
<%--<%@ page session="false" %>--%>
<%--<html>--%>
<%--<head>--%>
<%--    <title>Books Page</title>--%>

<%--    <style type="text/css">--%>
<%--        .tg {--%>
<%--            border-collapse: collapse;--%>
<%--            border-spacing: 0;--%>
<%--            border-color: #ccc;--%>
<%--        }--%>

<%--        .tg td {--%>
<%--            font-family: Arial, sans-serif;--%>
<%--            font-size: 14px;--%>
<%--            padding: 10px 5px;--%>
<%--            border-style: solid;--%>
<%--            border-width: 1px;--%>
<%--            overflow: hidden;--%>
<%--            word-break: normal;--%>
<%--            border-color: #ccc;--%>
<%--            color: #333;--%>
<%--            background-color: #fff;--%>
<%--        }--%>

<%--        .tg th {--%>
<%--            font-family: Arial, sans-serif;--%>
<%--            font-size: 14px;--%>
<%--            font-weight: normal;--%>
<%--            padding: 10px 5px;--%>
<%--            border-style: solid;--%>
<%--            border-width: 1px;--%>
<%--            overflow: hidden;--%>
<%--            word-break: normal;--%>
<%--            border-color: #ccc;--%>
<%--            color: #333;--%>
<%--            background-color: #f0f0f0;--%>
<%--        }--%>

<%--        .tg .tg-4eph {--%>
<%--            background-color: #f9f9f9--%>
<%--        }--%>
<%--    </style>--%>
<%--</head>--%>
<%--<body>--%>
<%--<a href="../../index.jsp">Back to main menu</a>--%>

<%--<br/>--%>
<%--<br/>--%>

<%--<h1>Book List</h1>--%>

<%--<c:if test="${!empty listBooks}">--%>
<%--    <table class="tg">--%>
<%--        <tr>--%>
<%--            <th width="80">ID</th>--%>
<%--            <th width="120">Title</th>--%>
<%--            <th width="120">Author</th>--%>
<%--            <th width="120">Price</th>--%>
<%--            <th width="60">Edit</th>--%>
<%--            <th width="60">Delete</th>--%>
<%--        </tr>--%>
<%--        <c:forEach items="${listBooks}" var="book">--%>
<%--            <tr>--%>
<%--                <td>${book.id}</td>--%>
<%--                <td><a href="/bookdata/${book.id}" target="_blank">${book.bookTitle}</a></td>--%>
<%--                <td>${book.bookAuthor}</td>--%>
<%--                <td>${book.price/100}${book.price%100}</td>--%>
<%--                <td><a href="<c:url value='/edit/${book.id}'/>">Edit</a></td>--%>
<%--                <td><a href="<c:url value='/remove/${book.id}'/>">Delete</a></td>--%>
<%--            </tr>--%>
<%--        </c:forEach>--%>
<%--    </table>--%>
<%--</c:if>--%>


<%--<h1>Add a Book</h1>--%>

<%--<c:url var="addAction" value="/books/add"/>--%>

<%--<form:form action="${addAction}" commandName="book">--%>
<%--    <table>--%>
<%--        <c:if test="${!empty book.bookTitle}">--%>
<%--            <tr>--%>
<%--                <td>--%>
<%--                    <form:label path="id">--%>
<%--                        <spring:message text="ID"/>--%>
<%--                    </form:label>--%>
<%--                </td>--%>
<%--                <td>--%>
<%--                    <form:input path="id" readonly="true" size="8" disabled="true"/>--%>
<%--                    <form:hidden path="id"/>--%>
<%--                </td>--%>
<%--            </tr>--%>
<%--        </c:if>--%>
<%--        <tr>--%>
<%--            <td>--%>
<%--                <form:label path="bookTitle">--%>
<%--                    <spring:message text="Title"/>--%>
<%--                </form:label>--%>
<%--            </td>--%>
<%--            <td>--%>
<%--                <form:input path="bookTitle"/>--%>
<%--            </td>--%>
<%--        </tr>--%>
<%--        <tr>--%>
<%--            <td>--%>
<%--                <form:label path="bookAuthor">--%>
<%--                    <spring:message text="Author"/>--%>
<%--                </form:label>--%>
<%--            </td>--%>
<%--            <td>--%>
<%--                <form:input path="bookAuthor"/>--%>
<%--            </td>--%>
<%--        </tr>--%>
<%--        <tr>--%>
<%--            <td>--%>
<%--                <form:label path="price">--%>
<%--                    <spring:message text="Price"/>--%>
<%--                </form:label>--%>
<%--            </td>--%>
<%--            <td>--%>
<%--                <form:input path="price"/>--%>
<%--            </td>--%>
<%--        </tr>--%>
<%--        <tr>--%>
<%--            <td colspan="2">--%>
<%--                <c:if test="${!empty book.bookTitle}">--%>
<%--                    <input type="submit"--%>
<%--                           value="<spring:message text="Edit Book"/>"/>--%>
<%--                </c:if>--%>
<%--                <c:if test="${empty book.bookTitle}">--%>
<%--                    <input type="submit"--%>
<%--                           value="<spring:message text="Add Book"/>"/>--%>
<%--                </c:if>--%>
<%--            </td>--%>
<%--        </tr>--%>
<%--    </table>--%>
<%--</form:form>--%>
<%--</body>--%>
<%--</html>--%>

