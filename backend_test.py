#!/usr/bin/env python3
"""
Backend API Testing Suite for Development Services Platform
Tests all FastAPI endpoints and validates functionality
"""

import requests
import sys
import json
from datetime import datetime, timezone
from typing import Dict, Any

class DevServicesAPITester:
    def __init__(self, base_url: str = "https://nss-qa-build.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_base = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []
        print(f"🔧 Testing API at: {self.api_base}")

    def run_test(self, test_name: str, method: str, endpoint: str, 
                 expected_status: int = 200, data: Dict[Any, Any] = None, 
                 params: Dict[str, str] = None) -> tuple:
        """Execute a single API test"""
        url = f"{self.api_base}/{endpoint}" if not endpoint.startswith('http') else endpoint
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Test {self.tests_run}: {test_name}")
        print(f"   {method} {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, params=params, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"   ✅ PASSED - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   📄 Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   📄 Response: {response.text[:200]}...")
            else:
                print(f"   ❌ FAILED - Expected {expected_status}, got {response.status_code}")
                print(f"   📄 Response: {response.text[:300]}...")

            # Record result
            self.test_results.append({
                'test_name': test_name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'response_preview': response.text[:200] if not success else "OK"
            })

            return success, response.json() if success and response.content else {}

        except requests.exceptions.RequestException as e:
            print(f"   ❌ FAILED - Network Error: {str(e)}")
            self.test_results.append({
                'test_name': test_name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': 'ERROR',
                'success': False,
                'response_preview': f"Network error: {str(e)}"
            })
            return False, {}
        except Exception as e:
            print(f"   ❌ FAILED - Unexpected Error: {str(e)}")
            self.test_results.append({
                'test_name': test_name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': 'ERROR',
                'success': False,
                'response_preview': f"Error: {str(e)}"
            })
            return False, {}

    def test_root_endpoint(self):
        """Test the API root endpoint"""
        return self.run_test("API Root", "GET", "")

    def test_get_services(self):
        """Test retrieving services"""
        return self.run_test("Get Services", "GET", "services")

    def test_create_service(self):
        """Test creating a new service"""
        service_data = {
            "name": "Test Service",
            "description": "A test service for API validation",
            "features": ["Feature 1", "Feature 2", "Feature 3"],
            "icon": "Code"
        }
        return self.run_test("Create Service", "POST", "services", 200, service_data)

    def test_create_quote_request(self):
        """Test creating a quote request"""
        quote_data = {
            "name": "John Doe",
            "email": "john@example.com",
            "company": "Test Company",
            "service": "development",
            "budget": "10k-25k",
            "description": "Need a full-stack web application for my business"
        }
        return self.run_test("Create Quote Request", "POST", "quotes", 200, quote_data)

    def test_get_quote_requests(self):
        """Test retrieving quote requests"""
        return self.run_test("Get Quote Requests", "GET", "quotes")

    def test_create_consultation(self):
        """Test creating a consultation booking"""
        consultation_data = {
            "name": "Jane Smith",
            "email": "jane@example.com",
            "phone": "+1234567890",
            "preferred_date": "2024-12-20",
            "preferred_time": "14:00",
            "topic": "development",
            "message": "Would like to discuss project requirements"
        }
        return self.run_test("Create Consultation", "POST", "consultations", 200, consultation_data)

    def test_get_consultations(self):
        """Test retrieving consultations"""
        return self.run_test("Get Consultations", "GET", "consultations")

    def test_get_stats(self):
        """Test retrieving dashboard statistics"""
        return self.run_test("Get Dashboard Stats", "GET", "stats")

    def test_update_quote_status(self, quote_id: str = None):
        """Test updating quote status"""
        if not quote_id:
            # First create a quote to update
            success, response = self.test_create_quote_request()
            if success and response.get('id'):
                quote_id = response['id']
            else:
                print("   ⚠️  SKIPPED - No quote ID available for status update test")
                return False, {}
        
        return self.run_test(
            "Update Quote Status", 
            "PATCH", 
            f"quotes/{quote_id}/status", 
            200, 
            params={'status': 'approved'}
        )

    def test_update_consultation_status(self, consultation_id: str = None):
        """Test updating consultation status"""
        if not consultation_id:
            # First create a consultation to update
            success, response = self.test_create_consultation()
            if success and response.get('id'):
                consultation_id = response['id']
            else:
                print("   ⚠️  SKIPPED - No consultation ID available for status update test")
                return False, {}
        
        return self.run_test(
            "Update Consultation Status", 
            "PATCH", 
            f"consultations/{consultation_id}/status", 
            200, 
            params={'status': 'approved'}
        )

    def run_comprehensive_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting Comprehensive Backend API Tests")
        print("=" * 60)

        # Test basic endpoints
        self.test_root_endpoint()
        self.test_get_services()
        self.test_create_service()
        
        # Test quote functionality
        quote_success, quote_response = self.test_create_quote_request()
        self.test_get_quote_requests()
        
        if quote_success and quote_response.get('id'):
            self.test_update_quote_status(quote_response['id'])
        else:
            self.test_update_quote_status()  # Will try to create one internally
        
        # Test consultation functionality
        consultation_success, consultation_response = self.test_create_consultation()
        self.test_get_consultations()
        
        if consultation_success and consultation_response.get('id'):
            self.test_update_consultation_status(consultation_response['id'])
        else:
            self.test_update_consultation_status()  # Will try to create one internally
        
        # Test stats endpoint
        self.test_get_stats()

        # Print summary
        self.print_summary()
        return self.tests_passed == self.tests_run

    def print_summary(self):
        """Print test execution summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%" if self.tests_run > 0 else "No tests run")
        
        # Show failed tests
        failed_tests = [test for test in self.test_results if not test['success']]
        if failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"   • {test['test_name']}: {test['response_preview']}")
        
        print("\n" + "=" * 60)

def main():
    """Main test execution function"""
    tester = DevServicesAPITester()
    
    try:
        success = tester.run_comprehensive_tests()
        return 0 if success else 1
    except KeyboardInterrupt:
        print("\n\n🛑 Testing interrupted by user")
        return 1
    except Exception as e:
        print(f"\n\n💥 Unexpected error during testing: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())