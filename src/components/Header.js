import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header className="header">
      <h1>LinkNote</h1>
      <p>간단하고 직관적인 노트 작성 및 관리</p>
      <nav>
        {user ? (
          <div>
            <Link to="/">홈</Link>
            <Link to="/note/new">새 노트</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          <div>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header; 