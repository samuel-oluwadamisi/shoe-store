"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, AlertCircle, Upload, X, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

interface ProductFormProps {
    initialData?: {
        id?: string;
        name: string;
        price: number;
        category: string;
        stock: number;
        description: string;
        images: string[];
    };
    onSubmit: (formData: FormData) => Promise<void | { error: string }>;
    submitLabel: string;
    pageTitle: string;
}

interface FormDataState {
    name: string;
    price: string;
    category: string;
    stock: string;
    description: string;
    imageUrl: string;
}

interface FormErrors {
    name?: string;
    price?: string;
    category?: string;
    stock?: string;
    description?: string;
    imageUrl?: string;
}

export function ProductForm({ initialData, onSubmit, submitLabel, pageTitle }: ProductFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormDataState>({
        name: initialData?.name || "",
        price: initialData?.price?.toString() || "",
        category: initialData?.category || "",
        stock: initialData?.stock?.toString() || "",
        description: initialData?.description || "",
        imageUrl: initialData?.images?.[0] || "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const categories = ["Streetwear", "Lifestyle", "Hybrid", "Running", "High-top"];

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Product name is required";
        }

        if (!formData.price || parseFloat(formData.price) <= 0) {
            newErrors.price = "Valid price is required";
        }

        if (!formData.category) {
            newErrors.category = "Category is required";
        }

        if (!formData.stock || parseInt(formData.stock) < 0) {
            newErrors.stock = "Valid stock quantity is required";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 5MB limit (1024 * 1024 * 5 bytes)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setFormData(prev => ({ ...prev, imageUrl: base64String }));
            if (errors.imageUrl) {
                setErrors(prev => ({ ...prev, imageUrl: undefined }));
            }
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, imageUrl: "" }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setIsSubmitting(true);

        try {
            const submitData = new FormData();
            submitData.append("name", formData.name);
            submitData.append("price", formData.price);
            submitData.append("category", formData.category);
            submitData.append("stock", formData.stock);
            submitData.append("description", formData.description);
            submitData.append("imageUrl", formData.imageUrl);

            const result = await onSubmit(submitData);

            if (result && typeof result === 'object' && 'error' in result) {
                toast.error(result.error);
                setIsSubmitting(false);
            }
            // If no error, we assume it's redirecting or handled by parent
        } catch (error: any) {
            // Check if it's a redirect error from Next.js (which is actually a success)
            if (error?.digest?.startsWith('NEXT_REDIRECT')) {
                // Let the framework handle the redirect
                return;
            }

            console.error("Form submission error:", error);
            toast.error(error.message || "Something went wrong");
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof FormDataState, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/products">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight">
                        {pageTitle}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your product inventory
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                            Product Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                placeholder="e.g., KOKO Walkers V2"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                aria-invalid={!!errors.name}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₦) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="299"
                                    value={formData.price}
                                    onChange={(e) => handleChange("price", e.target.value)}
                                    aria-invalid={!!errors.price}
                                />
                                {errors.price && (
                                    <p className="text-sm text-destructive flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.price}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock Quantity *</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    placeholder="50"
                                    value={formData.stock}
                                    onChange={(e) => handleChange("stock", e.target.value)}
                                    aria-invalid={!!errors.stock}
                                />
                                {errors.stock && (
                                    <p className="text-sm text-destructive flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.stock}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <Button
                                        key={cat}
                                        type="button"
                                        variant={formData.category === cat ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handleChange("category", cat)}
                                    >
                                        {formData.category === cat && (
                                            <Check className="h-3 w-3 mr-1" />
                                        )}
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                            {errors.category && (
                                <p className="text-sm text-destructive flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <textarea
                                id="description"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Describe your product..."
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                aria-invalid={!!errors.description}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Product Image</Label>

                            {!formData.imageUrl ? (
                                <div
                                    className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:bg-muted/50 hover:border-muted-foreground/50 transition-colors cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        Click to upload image
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Max size: 5MB (PNG, JPG)
                                    </p>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                </div>
                            ) : (
                                <div className="relative rounded-lg overflow-hidden border bg-muted aspect-video w-full max-w-sm">
                                    <Image
                                        src={formData.imageUrl}
                                        alt="Product preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                        onClick={removeImage}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}

                            {errors.imageUrl && (
                                <p className="text-sm text-destructive flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.imageUrl}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Link href="/admin/products">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : submitLabel}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
