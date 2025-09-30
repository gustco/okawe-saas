import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import Sidebar from './Sidebar';
import { localStorageService, User, ChatMessage, ChatChannel } from '../services/localStorage';
import { 
  MessageSquare, 
  Search, 
  Hash, 
  Users, 
  Send, 
  Paperclip, 
  Smile, 
  MoreHorizontal,
  Phone,
  Video,
  Star,
  Settings,
  Plus,
  Filter,
  CheckCircle,
  Circle,
  Minus,
  AtSign,
  ChevronDown,
  Bell,
  BellOff,
  Pin,
  Edit3,
  Reply,
  Calendar,
  Clock,
  Info
} from 'lucide-react';

interface ChatPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userType: string | null;
  currentUser: User | null;
}

export default function ChatPage({ onNavigate, onLogout, userType, currentUser }: ChatPageProps) {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations = [
    {
      id: '1',
      name: 'Sabrina Leons',
      avatar: 'SL',
      lastMessage: 'That\'s great to hear. Also hey, I notice you love manga and anime. I\'m a weeb myself. What\'s your favourite?',
      time: '2:50PM',
      unread: 0,
      isOnline: true,
      type: 'direct'
    },
    {
      id: '2',
      name: 'Jace Martinez',
      avatar: 'JM',
      lastMessage: 'Working on it. 👍',
      time: '2:25PM',
      unread: 0,
      isOnline: false,
      type: 'direct'
    },
    {
      id: '3',
      name: 'Ken Chanter',
      avatar: 'KC',
      lastMessage: 'Software Engineer, loves Cars',
      time: '1:45PM',
      unread: 0,
      isOnline: true,
      type: 'direct'
    }
  ];

  const teams = [
    { id: 'design', name: 'Design Founders', unread: 2, isPrivate: false },
    { id: 'creative', name: 'Creative Technologists', unread: 0, isPrivate: false },
    { id: 'ux', name: 'UX/UI Designers', unread: 1, isPrivate: true },
    { id: 'engineers', name: 'Engineers that love Anime', unread: 0, isPrivate: false },
    { id: 'xr', name: 'XR Prototypes', unread: 0, isPrivate: false },
    { id: 'preseed', name: 'Pre-seed Founders', unread: 0, isPrivate: true }
  ];

  const directMessages = [
    { id: 'justin', name: 'Justin Derwent', avatar: 'JD', isOnline: true, unread: 0 },
    { id: 'makenna', name: 'Makenna Workman', avatar: 'MW', isOnline: false, unread: 0 },
    { id: 'jaxson', name: 'Jaxson Levin', avatar: 'JL', isOnline: true, unread: 0 },
    { id: 'jordyn', name: 'Jordyn Baptista', avatar: 'JB', isOnline: false, unread: 0 }
  ];

  const sampleMessages = [
    {
      id: '1',
      text: 'Woot it\'s cool that you know Unity too! I\'ve used Unity in some works of mine too. What do you like about it?',
      userId: 'sabrina',
      userName: 'Sabrina Leons',
      timestamp: '2:50PM',
      avatar: 'SL'
    },
    {
      id: '2',
      text: 'Yes, I studied Unity with an SR bootcamp foundations. Afterwards did some projects with it. I would say I like me prototype.',
      userId: 'me',
      userName: 'You',
      timestamp: '2:50PM',
      avatar: 'AI'
    },
    {
      id: '3',
      text: 'That\'s great to hear. Also hey, I notice you love manga and anime. I\'m a weeb myself. What\'s your favourite?',
      userId: 'sabrina',
      userName: 'Sabrina Leons',
      timestamp: '2:50PM',
      avatar: 'SL'
    },
    {
      id: '4',
      text: 'Oh yes! I\'m currently reading One Piece! I\'ve loved the adventure of it. What about you?',
      userId: 'me',
      userName: 'You',
      timestamp: '2:50PM',
      avatar: 'AI'
    }
  ];

  useEffect(() => {
    // Set default selected chat
    if (conversations.length > 0) {
      setSelectedChat(conversations[0]);
      setMessages(sampleMessages as any);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      userId: 'me',
      userName: 'You',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      }),
      avatar: 'AI'
    };

    setMessages(prev => [...prev, newMsg as any]);
    setNewMessage('');
  };

  const formatTime = (time: string) => {
    return time;
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userType={userType as any} 
        currentUser={currentUser}
        onNavigate={onNavigate} 
        onLogout={onLogout} 
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-80 bg-card border-r border-border flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Conversations</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {/* Filter Tabs */}
            <div className="p-2 border-b border-border">
              <div className="flex text-sm">
                <button className="px-3 py-1 text-foreground border-b-2 border-accent">
                  Daily Messages
                </button>
                <button className="px-3 py-1 text-muted-foreground hover:text-foreground">
                  Group
                </button>
              </div>
            </div>

            {/* Direct Messages */}
            <div className="p-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedChat(conv);
                    setMessages(sampleMessages as any);
                  }}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1
                    ${selectedChat?.id === conv.id ? 'bg-accent/10 border border-accent/20' : 'hover:bg-muted/50'}
                  `}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        {conv.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {conv.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-card rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm truncate">{conv.name}</h4>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  
                  {conv.unread > 0 && (
                    <Badge variant="destructive" className="h-5 min-w-[20px] px-1 text-xs">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Teams */}
            <div className="p-2">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <Hash className="h-3 w-3" />
                Teams
                <Button variant="ghost" size="sm" className="ml-auto h-4 w-4 p-0">
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
              
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm flex-1 truncate">{team.name}</span>
                  {team.unread > 0 && (
                    <Badge variant="destructive" className="h-4 min-w-[16px] px-1 text-xs">
                      {team.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Direct Messages */}
            <div className="p-2">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <Users className="h-3 w-3" />
                Direct Messages
                <Button variant="ghost" size="sm" className="ml-auto h-4 w-4 p-0">
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
              
              {directMessages.map((dm) => (
                <div
                  key={dm.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="relative">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-muted">
                        {dm.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {dm.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-success border border-card rounded-full" />
                    )}
                  </div>
                  <span className="text-sm flex-1 truncate">{dm.name}</span>
                  {dm.unread > 0 && (
                    <Badge variant="destructive" className="h-4 min-w-[16px] px-1 text-xs">
                      {dm.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {selectedChat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedChat.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Have been creating installation art since 16 years old.
                      <br />
                      Enjoy using 3D softwares to bring her vision to life.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message, index) => {
                  const isMe = message.userId === 'me';
                  const prevMessage = index > 0 ? messages[index - 1] : null;
                  const showAvatar = !prevMessage || prevMessage.userId !== message.userId;
                  
                  return (
                    <div key={message.id} className={`flex gap-3 ${showAvatar ? '' : 'mt-1'}`}>
                      <div className="w-10">
                        {showAvatar && (
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className={isMe ? 'bg-muted' : 'bg-accent text-accent-foreground'}>
                              {message.avatar}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {showAvatar && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{message.userName}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        )}
                        
                        <div className={`group relative ${!showAvatar ? 'ml-2' : ''}`}>
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          
                          {/* Message Actions */}
                          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex gap-1 bg-card border border-border rounded-lg shadow-lg p-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Smile className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Reply className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type your message here..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="pr-20 resize-none min-h-[44px] rounded-2xl"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={!newMessage.trim()}
                    className="h-11 px-4 rounded-2xl bg-accent hover:bg-accent/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-medium mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the sidebar to start chatting
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Match Summary */}
        {selectedChat && (
          <div className="w-80 bg-card border-l border-border p-6">
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="bg-accent text-accent-foreground text-lg">
                    {selectedChat.avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mb-2">{selectedChat.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Have been creating installation art since 16 years old.
                  Enjoy using 3D softwares to bring her vision to life.
                </p>
              </div>

              <Separator />

              {/* Match Summary */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium mb-3 text-sm">Match Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Relevancy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Creative</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Learning</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Interests */}
              <div>
                <h4 className="font-medium mb-3 text-sm">Interests</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  From the conversation, it is obvious that Sabrina and you shared common interests through installation artforms and manga interests.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}