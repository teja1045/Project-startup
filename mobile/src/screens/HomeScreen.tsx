import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../navigation/RootNavigator';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const services = [
    {
      id: 1,
      title: 'Development',
      description: 'Full-stack development with modern frameworks',
      icon: '💻',
      features: ['React & Node.js', 'API Development', 'Database Design', 'Cloud Integration'],
    },
    {
      id: 2,
      title: 'Deployment',
      description: 'Seamless deployment and CI/CD pipeline setup',
      icon: '🚀',
      features: ['Cloud Setup', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Monitoring'],
    },
    {
      id: 3,
      title: 'QA',
      description: 'Comprehensive quality assurance and testing',
      icon: '🛡️',
      features: ['Automated Testing', 'Manual Testing', 'Performance Testing', 'Security Audits'],
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(99, 102, 241, 0.15)', 'rgba(139, 92, 246, 0.08)', 'transparent']}
        style={styles.backgroundGradient}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo} />
            <Text style={styles.logoText}>DevServices</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')}>
            <Text style={styles.adminLink}>Admin</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Engineering the <Text style={styles.gradientText}>Future</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Full-stack development, seamless deployment, and rigorous QA. We build what's next.
          </Text>
          
          <View style={styles.ctaButtons}>
            <GlassButton
              title="Request Quote"
              onPress={() => navigation.navigate('Quote')}
              style={styles.ctaButton}
            />
            <GlassButton
              title="Book Consultation"
              onPress={() => navigation.navigate('Consultation')}
              variant="outline"
              style={styles.ctaButton}
            />
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <Text style={styles.sectionSubtitle}>Elite engineering solutions for modern challenges</Text>
          
          {services.map((service) => (
            <GlassCard key={service.id} style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
              <View style={styles.featureList}>
                {service.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Text style={styles.featureBullet}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </GlassCard>
          ))}
        </View>

        {/* Process Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How We Work</Text>
          <Text style={styles.sectionSubtitle}>A proven methodology for exceptional results</Text>
          
          <View style={styles.processContainer}>
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your needs and goals' },
              { step: '02', title: 'Planning', desc: 'Strategic roadmap and architecture' },
              { step: '03', title: 'Execution', desc: 'Agile development and testing' },
              { step: '04', title: 'Delivery', desc: 'Deployment and ongoing support' },
            ].map((item, index) => (
              <GlassCard key={index} style={styles.processCard}>
                <Text style={styles.processStep}>{item.step}</Text>
                <Text style={styles.processTitle}>{item.title}</Text>
                <Text style={styles.processDesc}>{item.desc}</Text>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <GlassCard style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Ready to Start Your Project?</Text>
          <Text style={styles.ctaSubtitle}>
            Get a detailed quote or book a free consultation with our experts
          </Text>
          <View style={styles.ctaButtons}>
            <GlassButton
              title="Request Quote"
              onPress={() => navigation.navigate('Quote')}
              style={styles.ctaButton}
            />
            <GlassButton
              title="Book Consultation"
              onPress={() => navigation.navigate('Consultation')}
              variant="outline"
              style={styles.ctaButton}
            />
          </View>
        </GlassCard>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 DevServices. Engineering Excellence.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    marginRight: 8,
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  adminLink: {
    color: '#a5b4fc',
    fontSize: 14,
  },
  hero: {
    marginBottom: 40,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 16,
    lineHeight: 44,
  },
  gradientText: {
    color: '#8b5cf6',
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  ctaButtons: {
    gap: 12,
  },
  ctaButton: {
    marginBottom: 8,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  serviceCard: {
    marginBottom: 16,
  },
  serviceIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  serviceTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  serviceDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureBullet: {
    color: '#6366f1',
    fontSize: 16,
    marginRight: 8,
  },
  featureText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  processContainer: {
    gap: 12,
  },
  processCard: {
    alignItems: 'center',
  },
  processStep: {
    color: '#6366f1',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  processTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  processDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    textAlign: 'center',
  },
  ctaCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ctaTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});

export default HomeScreen;
