# Phantom Wallet Integration

Tài liệu này mô tả cách tích hợp Phantom wallet vào ứng dụng Agent Mission Control ( AMC ).

## Tổng quan

Ứng dụng đã được tích hợp với Phantom wallet để cho phép người dùng kết nối ví Solana và thực hiện các giao dịch blockchain. Tích hợp này bao gồm:

- Component `PhantomWallet` để hiển thị trạng thái kết nối ví
- Store management với Zustand để quản lý trạng thái ví
- Utility functions để xử lý kết nối/ngắt kết nối ví
- Custom hook `useWallet` để sử dụng trong components

## Cấu trúc Files

```
lib/
├── types.ts                 # Định nghĩa WalletState interface
├── store.ts                 # Zustand store với wallet state management
├── hooks/
│   └── useWallet.ts        # Custom hook cho wallet operations
└── wallet/
    └── utils.ts             # Utility functions cho wallet operations

components/
└── PhantomWallet.tsx        # Main wallet component

app/
└── page.tsx                 # Main page với wallet integration
```

## Cách sử dụng

### 1. Sử dụng PhantomWallet Component

```tsx
import PhantomWallet from '@/components/PhantomWallet';

function MyComponent() {
  const handleWalletConnect = (publicKey: string) => {
    console.log('Wallet connected:', publicKey);
    // Thực hiện logic khi ví được kết nối
  };

  return (
    <PhantomWallet 
      onWalletConnect={handleWalletConnect}
      className="my-custom-class"
    />
  );
}
```

### 2. Sử dụng useWallet Hook

```tsx
import { useWallet } from '@/lib/hooks/useWallet';

function MyComponent() {
  const { 
    isConnected, 
    publicKey, 
    walletName, 
    connectWallet, 
    disconnectWallet 
  } = useWallet();

  return (
    <div>
      {isConnected ? (
        <p>Connected: {publicKey}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
```

### 3. Truy cập Wallet State từ Store

```tsx
import { appStore } from '@/lib/store';

function MyComponent() {
  const walletState = appStore.getState().wallet;
  
  // Hoặc subscribe để nhận updates
  useEffect(() => {
    const unsubscribe = appStore.subscribe((state) => {
      console.log('Wallet state changed:', state.wallet);
    });
    
    return unsubscribe;
  }, []);
}
```

## API Reference

### WalletState Interface

```typescript
interface WalletState {
  isConnected: boolean;
  publicKey: string | null;
  walletName: string | null;
}
```

### PhantomWallet Props

```typescript
interface PhantomWalletProps {
  onWalletConnect?: (publicKey: string) => void;
  className?: string;
}
```

### Wallet Utility Functions

```typescript
// Kiểm tra Phantom wallet có sẵn không
isPhantomAvailable(): boolean

// Format public key (rút gọn)
formatPublicKey(publicKey: string | null, length?: number): string

// Validate Solana public key
isValidPublicKey(publicKey: string): boolean

// Kết nối ví
connectWallet(): Promise<{ success: boolean; publicKey?: string; error?: string }>

// Ngắt kết nối ví
disconnectWallet(): Promise<{ success: boolean; error?: string }>
```

## Tính năng

### ✅ Đã hoàn thành

- [x] Tích hợp Phantom wallet component
- [x] State management với Zustand store
- [x] Utility functions cho wallet operations
- [x] Custom hook cho wallet state
- [x] Error handling và loading states
- [x] TypeScript support đầy đủ
- [x] Responsive UI design
- [x] Public key formatting

### 🔄 Có thể mở rộng

- [ ] Hỗ trợ nhiều loại ví khác (Solflare, Backpack, etc.)
- [ ] Transaction signing functionality
- [ ] Wallet balance display
- [ ] Network switching (Mainnet, Devnet, Testnet)
- [ ] Wallet connection persistence
- [ ] Multi-wallet support

## Cài đặt Dependencies

Các dependencies cần thiết đã được cài đặt:

```bash
npm install @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

## Troubleshooting

### Lỗi thường gặp

1. **"Phantom wallet not available"**
   - Đảm bảo Phantom extension đã được cài đặt
   - Kiểm tra extension có được enable không

2. **"Failed to connect wallet"**
   - Kiểm tra Phantom extension có hoạt động không
   - Thử refresh trang và kết nối lại

3. **TypeScript errors**
   - Đảm bảo đã import đúng types
   - Kiểm tra window.solana interface

### Debug

Để debug wallet connection:

```typescript
// Kiểm tra Phantom có sẵn không
console.log('Phantom available:', isPhantomAvailable());

// Kiểm tra wallet state
console.log('Wallet state:', appStore.getState().wallet);

// Listen for wallet events
window.solana?.on('connect', () => console.log('Wallet connected'));
window.solana?.on('disconnect', () => console.log('Wallet disconnected'));
```

## Security Notes

- Luôn validate public keys trước khi sử dụng
- Không lưu trữ private keys trong ứng dụng
- Sử dụng HTTPS trong production
- Implement proper error handling cho tất cả wallet operations

## Liên kết hữu ích

- [Phantom Wallet Documentation](https://docs.phantom.app/)
- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
