import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { quotesAPI, consultationsAPI, statsAPI, authAPI } from '../services/api';

const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'quotes' | 'consultations'>('quotes');
  const [stats, setStats] = useState({
    total_quotes: 0,
    pending_quotes: 0,
    total_consultations: 0,
    pending_consultations: 0,
  });
  const [quotes, setQuotes] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const [statsData, quotesData, consultationsData] = await Promise.all([
        statsAPI.get(),
        quotesAPI.getAll(50, 0),
        consultationsAPI.getAll(50, 0),
      ]);
      setStats(statsData);
      setQuotes(quotesData);
      setConsultations(consultationsData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await authAPI.logout();
    navigation.replace('Home');
  };

  const handleUpdateStatus = async (id: string, status: string, type: 'quote' | 'consultation') => {
    try {
      if (type === 'quote') {
        await quotesAPI.updateStatus(id, status);
      } else {
        await consultationsAPI.updateStatus(id, status);
      }
      Alert.alert('Success', 'Status updated successfully');
      fetchData();
    } catch (error) {
      Alert.alert('Error', 'Failed to update status');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          Admin <Text style={styles.gradientText}>Dashboard</Text>
        </Text>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statValue}>{stats.total_quotes}</Text>
            <Text style={styles.statLabel}>Total Quotes</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statValue}>{stats.pending_quotes}</Text>
            <Text style={styles.statLabel}>Pending Quotes</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statValue}>{stats.total_consultations}</Text>
            <Text style={styles.statLabel}>Total Consultations</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statValue}>{stats.pending_consultations}</Text>
            <Text style={styles.statLabel}>Pending Consultations</Text>
          </GlassCard>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'quotes' && styles.activeTab]}
            onPress={() => setActiveTab('quotes')}>
            <Text style={[styles.tabText, activeTab === 'quotes' && styles.activeTabText]}>
              Quotes ({quotes.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'consultations' && styles.activeTab]}
            onPress={() => setActiveTab('consultations')}>
            <Text style={[styles.tabText, activeTab === 'consultations' && styles.activeTabText]}>
              Consultations ({consultations.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'quotes' ? (
          quotes.length === 0 ? (
            <GlassCard style={styles.emptyCard}>
              <Text style={styles.emptyText}>No quote requests yet</Text>
            </GlassCard>
          ) : (
            quotes.map((quote) => (
              <GlassCard key={quote.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{quote.name}</Text>
                  <View style={[styles.badge, styles[`${quote.status}Badge`]]}>
                    <Text style={styles.badgeText}>{quote.status}</Text>
                  </View>
                </View>
                <Text style={styles.itemEmail}>{quote.email}</Text>
                {quote.company && <Text style={styles.itemDetail}>Company: {quote.company}</Text>}
                <Text style={styles.itemDetail}>Service: {quote.service}</Text>
                {quote.budget && <Text style={styles.itemDetail}>Budget: {quote.budget}</Text>}
                <Text style={styles.itemDescription}>{quote.description}</Text>
                {quote.status === 'pending' && (
                  <View style={styles.actions}>
                    <GlassButton
                      title="Approve"
                      onPress={() => handleUpdateStatus(quote.id, 'approved', 'quote')}
                      style={styles.actionButton}
                    />
                    <GlassButton
                      title="Reject"
                      onPress={() => handleUpdateStatus(quote.id, 'rejected', 'quote')}
                      variant="outline"
                      style={styles.actionButton}
                    />
                  </View>
                )}
              </GlassCard>
            ))
          )
        ) : consultations.length === 0 ? (
          <GlassCard style={styles.emptyCard}>
            <Text style={styles.emptyText}>No consultation bookings yet</Text>
          </GlassCard>
        ) : (
          consultations.map((consultation) => (
            <GlassCard key={consultation.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{consultation.name}</Text>
                <View style={[styles.badge, styles[`${consultation.status}Badge`]]}>
                  <Text style={styles.badgeText}>{consultation.status}</Text>
                </View>
              </View>
              <Text style={styles.itemEmail}>{consultation.email}</Text>
              {consultation.phone && <Text style={styles.itemDetail}>Phone: {consultation.phone}</Text>}
              <Text style={styles.itemDetail}>Date: {consultation.preferred_date}</Text>
              <Text style={styles.itemDetail}>Time: {consultation.preferred_time}</Text>
              <Text style={styles.itemDetail}>Topic: {consultation.topic}</Text>
              {consultation.message && <Text style={styles.itemDescription}>{consultation.message}</Text>}
              {consultation.status === 'pending' && (
                <View style={styles.actions}>
                  <GlassButton
                    title="Approve"
                    onPress={() => handleUpdateStatus(consultation.id, 'approved', 'consultation')}
                    style={styles.actionButton}
                  />
                  <GlassButton
                    title="Reject"
                    onPress={() => handleUpdateStatus(consultation.id, 'rejected', 'consultation')}
                    variant="outline"
                    style={styles.actionButton}
                  />
                </View>
              )}
            </GlassCard>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 14,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
  gradientText: {
    color: '#8b5cf6',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
  },
  statValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  tabs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  emptyCard: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  itemCard: {
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
  },
  approvedBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  rejectedBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  itemEmail: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 8,
  },
  itemDetail: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  itemDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
});

export default AdminDashboardScreen;