// Local storage management for queries and results
export interface StoredQuery {
  id: string;
  query: string;
  timestamp: number;
  results: any; // QueryResponse type
  favorite: boolean;
  notes: string;
}

export interface QueryHistory {
  queries: StoredQuery[];
  favorites: StoredQuery[];
}

export class QueryStorageManager {
  private storageKey = 'insightapp-query-history';

  // Save a query and its results
  saveQuery(query: string, results: any): string {
    const queryId = this.generateId();
    const storedQuery: StoredQuery = {
      id: queryId,
      query,
      timestamp: Date.now(),
      results,
      favorite: false,
      notes: ''
    };

    const history = this.getQueryHistory();
    history.queries.unshift(storedQuery); // Add to beginning

    // Keep only last 100 queries
    if (history.queries.length > 100) {
      history.queries = history.queries.slice(0, 100);
    }

    this.setQueryHistory(history);
    return queryId;
  }

  // Get all query history
  getQueryHistory(): QueryHistory {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          queries: parsed.queries || [],
          favorites: parsed.favorites || []
        };
      }
    } catch (error) {
      console.error('Error loading query history:', error);
    }
    
    return { queries: [], favorites: [] };
  }

  // Set query history
  private setQueryHistory(history: QueryHistory) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving query history:', error);
    }
  }

  // Get recent queries
  getRecentQueries(limit: number = 10): StoredQuery[] {
    const history = this.getQueryHistory();
    return history.queries.slice(0, limit);
  }

  // Get favorite queries
  getFavoriteQueries(): StoredQuery[] {
    const history = this.getQueryHistory();
    return history.queries.filter(q => q.favorite);
  }

  // Toggle favorite status
  toggleFavorite(queryId: string): boolean {
    const history = this.getQueryHistory();
    const query = history.queries.find(q => q.id === queryId);
    
    if (query) {
      query.favorite = !query.favorite;
      this.setQueryHistory(history);
      return query.favorite;
    }
    
    return false;
  }

  // Add notes to a query
  addNotes(queryId: string, notes: string): boolean {
    const history = this.getQueryHistory();
    const query = history.queries.find(q => q.id === queryId);
    
    if (query) {
      query.notes = notes;
      this.setQueryHistory(history);
      return true;
    }
    
    return false;
  }

  // Delete a query
  deleteQuery(queryId: string): boolean {
    const history = this.getQueryHistory();
    const index = history.queries.findIndex(q => q.id === queryId);
    
    if (index >= 0) {
      history.queries.splice(index, 1);
      this.setQueryHistory(history);
      return true;
    }
    
    return false;
  }

  // Search query history
  searchQueries(searchTerm: string): StoredQuery[] {
    const history = this.getQueryHistory();
    const term = searchTerm.toLowerCase();
    
    return history.queries.filter(q => 
      q.query.toLowerCase().includes(term) ||
      q.notes.toLowerCase().includes(term)
    );
  }

  // Get query statistics
  getQueryStats() {
    const history = this.getQueryHistory();
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    const todayQueries = history.queries.filter(q => 
      now - q.timestamp < oneDay
    ).length;

    const weekQueries = history.queries.filter(q => 
      now - q.timestamp < oneWeek
    ).length;

    const monthQueries = history.queries.filter(q => 
      now - q.timestamp < oneMonth
    ).length;

    const mostCommonQueries = this.getMostCommonQueries();

    return {
      totalQueries: history.queries.length,
      todayQueries,
      weekQueries,
      monthQueries,
      favoriteCount: history.queries.filter(q => q.favorite).length,
      mostCommonQueries,
      avgQueriesPerDay: weekQueries / 7
    };
  }

  // Get most common query patterns
  private getMostCommonQueries(): { query: string; count: number }[] {
    const history = this.getQueryHistory();
    const queryMap = new Map<string, number>();

    history.queries.forEach(q => {
      const normalized = q.query.toLowerCase().trim();
      queryMap.set(normalized, (queryMap.get(normalized) || 0) + 1);
    });

    return Array.from(queryMap.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  // Export query history
  exportHistory(): string {
    const history = this.getQueryHistory();
    return JSON.stringify(history, null, 2);
  }

  // Import query history
  importHistory(data: string): boolean {
    try {
      const imported = JSON.parse(data);
      if (imported.queries && Array.isArray(imported.queries)) {
        this.setQueryHistory(imported);
        return true;
      }
    } catch (error) {
      console.error('Error importing query history:', error);
    }
    return false;
  }

  // Clear all history
  clearHistory(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Format timestamp for display
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  }
}

// Export singleton instance
export const queryStorage = new QueryStorageManager();