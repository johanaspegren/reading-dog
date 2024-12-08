import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import TextList from './components/TextList';
import ReadingSession from './components/ReadingSession';
import UserProfile from './components/UserProfile';
import LanguageSwitcher from './components/LanguageSwitcher';
import { BookOpen, UserCircle } from 'lucide-react';
import { TextData, User, ReadingResult } from './types';
import { storageManager } from './utils/storage';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { t } = useLanguage();
  const [texts, setTexts] = useState<TextData[]>([]);
  const [selectedText, setSelectedText] = useState<TextData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [savedTexts, savedUsers] = await Promise.all([
        storageManager.getAllTexts(),
        storageManager.getAllUsers()
      ]);
      setTexts(savedTexts);
      setUsers(savedUsers);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (fileData: TextData) => {
    const newText = {
      id: Date.now(),
      ...fileData
    };
    
    try {
      await storageManager.saveText(newText);
      setTexts(prev => [...prev, newText]);
    } catch (error) {
      console.error('Error saving text:', error);
    }
  };

  const handleDeleteText = async (id: number) => {
    try {
      await storageManager.deleteText(id);
      setTexts(prev => prev.filter(text => text.id !== id));
      if (selectedText?.id === id) {
        setSelectedText(null);
      }
    } catch (error) {
      console.error('Error deleting text:', error);
    }
  };

  const handleAddUser = async (user: User) => {
    try {
      await storageManager.saveUser(user);
      setUsers(prev => [...prev, user]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await storageManager.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      if (selectedUser?.id === id) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleReadingComplete = async (result: Omit<ReadingResult, 'id' | 'userId' | 'timestamp'>) => {
    if (!selectedUser) return;

    const readingResult: ReadingResult = {
      id: Date.now(),
      userId: selectedUser.id,
      timestamp: new Date().toISOString(),
      ...result
    };

    try {
      await storageManager.saveReadingResult(readingResult);
    } catch (error) {
      console.error('Error saving reading result:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">{t('app.title')}</h1>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <UserProfile
              users={users}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
              onAddUser={handleAddUser}
              onDeleteUser={handleDeleteUser}
            />

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">{t('upload.title')}</h2>
              <FileUpload onFileUpload={handleFileUpload} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">{t('reading.materials')}</h2>
              {isLoading ? (
                <div className="text-center text-gray-500">Loading...</div>
              ) : (
                <TextList
                  texts={texts}
                  onSelect={setSelectedText}
                  onDelete={handleDeleteText}
                  selectedId={selectedText?.id}
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {!selectedUser ? (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <UserCircle className="h-12 w-12 text-gray-400 mx-auto" />
                <h2 className="mt-2 text-xl font-semibold text-gray-900">
                  {t('app.selectUser')}
                </h2>
                <p className="mt-1 text-gray-500">
                  {t('app.selectUserSubtext')}
                </p>
              </div>
            ) : selectedText ? (
              <ReadingSession
                text={selectedText}
                onComplete={handleReadingComplete}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto" />
                <h2 className="mt-2 text-xl font-semibold text-gray-900">
                  {t('app.selectText')}
                </h2>
                <p className="mt-1 text-gray-500">
                  {t('app.selectTextSubtext')}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;